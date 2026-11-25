<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/image_optimize.php';
cors_headers();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH) ?: '/';
// Soporta /api/... o acceso directo
$path = preg_replace('#^/api#', '', $path) ?: '/';
$path = rtrim($path, '/') ?: '/';

try {
    // Salud
    if ($method === 'GET' && $path === '/') {
        json_out(['ok' => true, 'service' => 'luz-de-la-verdad-api']);
    }

    // Auth
    if ($method === 'POST' && $path === '/auth/login') {
        $body = read_json_body();
        $email = trim((string) ($body['email'] ?? ''));
        $password = (string) ($body['password'] ?? '');
        if ($email === '' || $password === '') {
            json_out(['error' => 'Correo y contraseña requeridos'], 422);
        }
        $stmt = db()->prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) {
            json_out(['error' => 'Credenciales incorrectas'], 401);
        }
        global $config;
        $exp = time() + ((int) $config['token_ttl_hours'] * 3600);
        $token = jwt_issue([
            'uid' => (int) $user['id'],
            'role' => $user['role'],
            'exp' => $exp,
        ]);
        json_out([
            'token' => $token,
            'expires_at' => gmdate('c', $exp),
            'user' => [
                'id' => (int) $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'],
            ],
        ]);
    }

    if ($method === 'GET' && $path === '/auth/me') {
        $user = require_auth();
        json_out(['user' => $user]);
    }

    // Artículos públicos
    if ($method === 'GET' && $path === '/articles') {
        $topic = trim((string) ($_GET['topic'] ?? ''));
        $status = trim((string) ($_GET['status'] ?? 'published'));
        $auth = null;
        $token = bearer_token();
        if ($token && ($payload = jwt_verify($token))) {
            $auth = $payload;
        }
        // Público solo ve published; admin puede pedir drafts
        if ($status !== 'published' && !$auth) {
            $status = 'published';
        }
        if ($topic !== '') {
            $stmt = db()->prepare('SELECT id, slug, topic, title, description, image, tag, status, published_at, updated_at FROM articles WHERE status = ? AND topic = ? ORDER BY COALESCE(published_at, updated_at) DESC');
            $stmt->execute([$status, $topic]);
        } else {
            $stmt = db()->prepare('SELECT id, slug, topic, title, description, image, tag, status, published_at, updated_at FROM articles WHERE status = ? ORDER BY COALESCE(published_at, updated_at) DESC');
            $stmt->execute([$status]);
        }
        json_out(['articles' => $stmt->fetchAll()]);
    }

    if ($method === 'GET' && preg_match('#^/articles/([^/]+)$#', $path, $m)) {
        $slug = urldecode($m[1]);
        $stmt = db()->prepare('SELECT * FROM articles WHERE slug = ?');
        $stmt->execute([$slug]);
        $article = $stmt->fetch();
        if (!$article) {
            json_out(['error' => 'Artículo no encontrado'], 404);
        }
        $token = bearer_token();
        $isAdmin = $token && jwt_verify($token);
        if ($article['status'] !== 'published' && !$isAdmin) {
            json_out(['error' => 'Artículo no encontrado'], 404);
        }
        json_out(['article' => $article]);
    }

    // Admin CRUD
    if ($method === 'POST' && $path === '/articles') {
        $user = require_auth();
        $body = read_json_body();
        $title = trim((string) ($body['title'] ?? ''));
        if ($title === '') {
            json_out(['error' => 'El título es obligatorio'], 422);
        }
        $slug = trim((string) ($body['slug'] ?? ''));
        if ($slug === '') {
            $slug = slugify($title);
        } else {
            $slug = slugify($slug);
        }
        $topic = trim((string) ($body['topic'] ?? 'general'));
        global $config;
        if (!in_array($topic, $config['topics'], true)) {
            $topic = 'general';
        }
        $status = ($body['status'] ?? 'draft') === 'published' ? 'published' : 'draft';
        $publishedAt = $status === 'published' ? gmdate('Y-m-d H:i:s') : null;
        try {
            $stmt = db()->prepare('INSERT INTO articles (slug, topic, title, description, image, tag, body_html, status, author_id, published_at) VALUES (?,?,?,?,?,?,?,?,?,?)');
            $stmt->execute([
                $slug,
                $topic,
                $title,
                trim((string) ($body['description'] ?? '')),
                trim((string) ($body['image'] ?? '')),
                trim((string) ($body['tag'] ?? 'Artículo')),
                (string) ($body['body_html'] ?? ''),
                $status,
                (int) $user['id'],
                $publishedAt,
            ]);
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'UNIQUE')) {
                json_out(['error' => 'Ese slug ya existe. Cambia el título o el slug.'], 409);
            }
            throw $e;
        }
        $id = (int) db()->lastInsertId();
        $stmt = db()->prepare('SELECT * FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        json_out(['article' => $stmt->fetch()], 201);
    }

    if ($method === 'PUT' && preg_match('#^/articles/(\d+)$#', $path, $m)) {
        require_auth();
        $id = (int) $m[1];
        $body = read_json_body();
        $stmt = db()->prepare('SELECT * FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        $current = $stmt->fetch();
        if (!$current) {
            json_out(['error' => 'Artículo no encontrado'], 404);
        }
        $title = trim((string) ($body['title'] ?? $current['title']));
        $slug = trim((string) ($body['slug'] ?? $current['slug']));
        $slug = slugify($slug !== '' ? $slug : $title);
        $topic = trim((string) ($body['topic'] ?? $current['topic']));
        global $config;
        if (!in_array($topic, $config['topics'], true)) {
            $topic = $current['topic'];
        }
        $status = ($body['status'] ?? $current['status']) === 'published' ? 'published' : 'draft';
        $publishedAt = $current['published_at'];
        if ($status === 'published' && !$publishedAt) {
            $publishedAt = gmdate('Y-m-d H:i:s');
        }
        if ($status === 'draft') {
            // conserva published_at histórico si existía
        }
        try {
            $upd = db()->prepare('UPDATE articles SET slug=?, topic=?, title=?, description=?, image=?, tag=?, body_html=?, status=?, published_at=?, updated_at=datetime(\'now\') WHERE id=?');
            $upd->execute([
                $slug,
                $topic,
                $title,
                trim((string) ($body['description'] ?? $current['description'])),
                trim((string) ($body['image'] ?? $current['image'])),
                trim((string) ($body['tag'] ?? $current['tag'])),
                (string) ($body['body_html'] ?? $current['body_html']),
                $status,
                $publishedAt,
                $id,
            ]);
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'UNIQUE')) {
                json_out(['error' => 'Ese slug ya existe'], 409);
            }
            throw $e;
        }
        $stmt = db()->prepare('SELECT * FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        json_out(['article' => $stmt->fetch()]);
    }

    if ($method === 'DELETE' && preg_match('#^/articles/(\d+)$#', $path, $m)) {
        require_auth();
        $id = (int) $m[1];
        $stmt = db()->prepare('DELETE FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        json_out(['ok' => true]);
    }

    // Subida de imagen (admin) — siempre se optimiza (JPEG ≤1600px)
    if ($method === 'POST' && $path === '/uploads/image') {
        require_auth();
        if (empty($_FILES['image']) || !is_array($_FILES['image'])) {
            json_out(['error' => 'Envía el campo image (multipart/form-data)'], 422);
        }
        $file = $_FILES['image'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            json_out(['error' => 'Error al subir el archivo'], 422);
        }
        $mime = (string) ($file['type'] ?? '');
        $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if ($mime !== '' && !in_array($mime, $allowed, true)) {
            json_out(['error' => 'Solo se permiten JPG, PNG, WebP o GIF'], 422);
        }
        $destDir = __DIR__ . '/uploads';
        $result = optimize_uploaded_image(
            (string) $file['tmp_name'],
            (string) ($file['name'] ?? 'imagen.jpg'),
            $destDir,
            '/uploads'
        );
        if (!$result['ok']) {
            json_out(['error' => $result['error'] ?? 'No se pudo optimizar'], 422);
        }
        json_out([
            'url' => $result['url'],
            'bytes' => $result['bytes'],
            'width' => $result['width'] ?? null,
            'height' => $result['height'] ?? null,
        ]);
    }

    // Servir uploads optimizados
    if ($method === 'GET' && preg_match('#^/uploads/([^/]+)$#', $path, $m)) {
        $name = basename($m[1]);
        $file = __DIR__ . '/uploads/' . $name;
        if (!is_file($file)) {
            json_out(['error' => 'Archivo no encontrado'], 404);
        }
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $types = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
        ];
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
        header('Cache-Control: public, max-age=604800');
        header('Content-Length: ' . (string) filesize($file));
        readfile($file);
        exit;
    }

    // Admin lista todos
    if ($method === 'GET' && $path === '/admin/articles') {
        require_auth();
        $stmt = db()->query('SELECT id, slug, topic, title, description, image, tag, status, published_at, updated_at FROM articles ORDER BY updated_at DESC');
        json_out(['articles' => $stmt->fetchAll()]);
    }

    if ($method === 'GET' && preg_match('#^/admin/articles/(\d+)$#', $path, $m)) {
        require_auth();
        $stmt = db()->prepare('SELECT * FROM articles WHERE id = ?');
        $stmt->execute([(int) $m[1]]);
        $article = $stmt->fetch();
        if (!$article) {
            json_out(['error' => 'Artículo no encontrado'], 404);
        }
        json_out(['article' => $article]);
    }

    json_out(['error' => 'Ruta no encontrada', 'path' => $path], 404);
} catch (Throwable $e) {
    json_out(['error' => 'Error del servidor', 'detail' => $e->getMessage()], 500);
}
