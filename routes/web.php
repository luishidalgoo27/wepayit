<?php

use Illuminate\Support\Facades\Route;

// Ruta de fallback para React
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');

/* Route::get('/prueba', function () {
    return view('prueba'); 
}); */