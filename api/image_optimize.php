<?php
declare(strict_types=1);

/**
 * Optimiza una imagen subida: redimensiona (máx 1600px) y guarda JPEG/WebP liviano.
 *
 * @return array{ok:bool, path?:string, url?:string, bytes?:int, error?:string}
 */
function optimize_uploaded_image(string $tmpPath, string $originalName, string $destDir, string $publicUrlPrefix = '/uploads'): array
{
    if (!is_file($tmpPath)) {
        return ['ok' => false, 'error' => 'Archivo temporal no encontrado'];
    }
    if (!function_exists('imagecreatefromstring')) {
        return ['ok' => false, 'error' => 'GD no disponible en el servidor'];
    }

    $raw = file_get_contents($tmpPath);
    if ($raw === false || $raw === '') {
        return ['ok' => false, 'error' => 'No se pudo leer la imagen'];
    }
    if (strlen($raw) > 12 * 1024 * 1024) {
        return ['ok' => false, 'error' => 'La imagen supera 12 MB'];
    }

    $src = @imagecreatefromstring($raw);
    if (!$src) {
        return ['ok' => false, 'error' => 'Formato de imagen no válido'];
    }

    $w = imagesx($src);
    $h = imagesy($src);
    $max = 1600;
    $scale = min(1.0, $max / max($w, 1), $max / max($h, 1));
    $nw = max(1, (int) round($w * $scale));
    $nh = max(1, (int) round($h * $scale));

    if ($nw !== $w || $nh !== $h) {
        $dst = imagecreatetruecolor($nw, $nh);
        imagealphablending($dst, true);
        imagesavealpha($dst, false);
        // fondo blanco por si venía PNG con transparencia
        $white = imagecolorallocate($dst, 255, 255, 255);
        imagefilledrectangle($dst, 0, 0, $nw, $nh, $white);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
        imagedestroy($src);
        $src = $dst;
    }

    if (!is_dir($destDir)) {
        mkdir($destDir, 0755, true);
    }

    $base = preg_replace('/\.[^.]+$/', '', basename($originalName)) ?: 'imagen';
    $base = preg_replace('/[^a-zA-Z0-9_-]+/', '-', $base) ?: 'imagen';
    $base = strtolower(trim($base, '-'));
    $name = $base . '-' . date('YmdHis') . '-' . bin2hex(random_bytes(3)) . '.jpg';
    $destPath = rtrim($destDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $name;

    // JPEG calidad ~78
    if (!imagejpeg($src, $destPath, 78)) {
        imagedestroy($src);
        return ['ok' => false, 'error' => 'No se pudo guardar la imagen optimizada'];
    }
    imagedestroy($src);

    $bytes = (int) filesize($destPath);
    $url = rtrim($publicUrlPrefix, '/') . '/' . $name;

    // Espejos públicos para servir /uploads sin pasar por PHP:
    // - frontend/public/uploads (Vite local)
    // - ../uploads (document root en VPS: /var/www/luz-de-la-verdad/uploads)
    foreach ([
        dirname(__DIR__) . '/frontend/public/uploads',
        dirname(__DIR__) . '/uploads',
    ] as $mirror) {
        $parent = dirname($mirror);
        if (!is_dir($parent)) {
            continue;
        }
        if (!is_dir($mirror)) {
            @mkdir($mirror, 0755, true);
        }
        if (is_dir($mirror)) {
            @copy($destPath, $mirror . DIRECTORY_SEPARATOR . $name);
        }
    }

    return [
        'ok' => true,
        'path' => $destPath,
        'url' => $url,
        'bytes' => $bytes,
        'width' => $nw,
        'height' => $nh,
    ];
}
