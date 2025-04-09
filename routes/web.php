<?php

use Illuminate\Support\Facades\Route;

// Ruta de fallback para React
Route::get('/{any}', function () {
    return view('welcome'); // Cambia "welcome" si estás usando otra vista principal
})->where('any', '.*'); // Captura todas las rutas posibles
