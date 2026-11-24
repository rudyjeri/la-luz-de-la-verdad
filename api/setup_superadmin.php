<?php
declare(strict_types=1);

/**
 * Crear el primer superadmin (CLI).
 *
 * Uso:
 *   php setup_superadmin.php correo@ejemplo.com "TuNombre" "TuPasswordSegura"
 */
require __DIR__ . '/bootstrap.php';

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "Solo por línea de comandos.\n");
    exit(1);
}

$email = $argv[1] ?? '';
$name = $argv[2] ?? 'Superadmin';
$password = $argv[3] ?? '';

if ($email === '' || $password === '') {
    fwrite(STDERR, "Uso: php setup_superadmin.php email nombre password\n");
    exit(1);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Email inválido.\n");
    exit(1);
}

if (strlen($password) < 8) {
    fwrite(STDERR, "La contraseña debe tener al menos 8 caracteres.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$pdo = db();

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE');
$stmt->execute([$email]);
$existing = $stmt->fetch();

if ($existing) {
    $upd = $pdo->prepare('UPDATE users SET name = ?, password_hash = ?, role = ? WHERE id = ?');
    $upd->execute([$name, $hash, 'superadmin', (int) $existing['id']]);
    echo "OK — superadmin actualizado: {$email}\n";
} else {
    $ins = $pdo->prepare('INSERT INTO users (email, name, password_hash, role) VALUES (?,?,?,?)');
    $ins->execute([$email, $name, $hash, 'superadmin']);
    echo "OK — superadmin creado: {$email}\n";
}

echo "Entra en: https://luzdelaverdad.levelschool.tech/admin/login\n";
