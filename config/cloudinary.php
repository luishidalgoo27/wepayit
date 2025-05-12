<?php

return [
    'cloud_url' => env('CLOUDINARY_URL', null),

    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET', null),

    'cloud' => [
        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
        'api_key'    => env('CLOUDINARY_API_KEY'),
        'api_secret' => env('CLOUDINARY_API_SECRET'),
    ],

    'url' => [
        'secure' => true, // always use https
    ],

    'upload' => [
        'use_filename' => true,
        'unique_filename' => true,
        'overwrite' => false,
    ],
];
