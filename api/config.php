<?php
declare(strict_types=1);

/**
 * Configuración API — La Luz de la Verdad
 */
return [
    // Cambia esto en el VPS (archivo api/secrets.php opcional)
    'jwt_secret' => getenv('LUZ_JWT_SECRET') ?: 'cambia-esta-clave-larga-en-produccion-luz-2026',
    'token_ttl_hours' => 72,
    'db_path' => __DIR__ . '/data/app.sqlite',
    'cors_origin' => getenv('LUZ_CORS_ORIGIN') ?: '*',
    // Temas permitidos (misma nomenclatura del frontend)
    'topics' => [
        'creacion-evolucion',
        'evidencias-diluvio',
        'biblia-dinosaurios',
        'historicidad-biblia',
        'general',
    ],
];
