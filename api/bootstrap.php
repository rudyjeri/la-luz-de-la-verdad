<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';
if (is_file(__DIR__ . '/secrets.php')) {
    $config = array_merge($config, require __DIR__ . '/secrets.php');
}

$dataDir = dirname($config['db_path']);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0750, true);
}

function db(): PDO
{
    static $pdo = null;
    global $config;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $pdo = new PDO('sqlite:' . $config['db_path'], null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA foreign_keys = ON');
    migrate($pdo);
    return $pdo;
}

function migrate(PDO $pdo): void
{
    $pdo->exec(<<<'SQL'
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'superadmin',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  topic TEXT NOT NULL DEFAULT 'general',
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Artículo',
  body_html TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  author_id INTEGER,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_topic ON articles(topic);
SQL);
}

function json_out(mixed $data, int $code = 200): never
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    if ($raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function b64url_encode(string $bin): string
{
    return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
}

function b64url_decode(string $str): string
{
    $pad = 4 - (strlen($str) % 4);
    if ($pad < 4) {
        $str .= str_repeat('=', $pad);
    }
    return (string) base64_decode(strtr($str, '-_', '+/'), true);
}

function jwt_issue(array $payload): string
{
    global $config;
    $header = b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $body = b64url_encode(json_encode($payload));
    $sig = b64url_encode(hash_hmac('sha256', $header . '.' . $body, $config['jwt_secret'], true));
    return $header . '.' . $body . '.' . $sig;
}

function jwt_verify(string $token): ?array
{
    global $config;
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }
    [$header, $body, $sig] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', $header . '.' . $body, $config['jwt_secret'], true));
    if (!hash_equals($expected, $sig)) {
        return null;
    }
    $payload = json_decode(b64url_decode($body), true);
    if (!is_array($payload)) {
        return null;
    }
    if (($payload['exp'] ?? 0) < time()) {
        return null;
    }
    return $payload;
}

function bearer_token(): ?string
{
    $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $hdr, $m)) {
        return $m[1];
    }
    return null;
}

function require_auth(): array
{
    $token = bearer_token();
    if (!$token) {
        json_out(['error' => 'No autenticado'], 401);
    }
    $payload = jwt_verify($token);
    if (!$payload) {
        json_out(['error' => 'Sesión inválida o expirada'], 401);
    }
    $stmt = db()->prepare('SELECT id, email, name, role FROM users WHERE id = ?');
    $stmt->execute([(int) $payload['uid']]);
    $user = $stmt->fetch();
    if (!$user) {
        json_out(['error' => 'Usuario no encontrado'], 401);
    }
    return $user;
}

function slugify(string $text): string
{
    $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text;
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    return trim($text, '-') ?: ('articulo-' . time());
}

function cors_headers(): void
{
    global $config;
    header('Access-Control-Allow-Origin: ' . $config['cors_origin']);
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
