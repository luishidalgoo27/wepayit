<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\Auth\GoogleController;

// Añadir esta ruta a tu archivo de rutas
Route::get('/accept-invitation/{code}', [InvitationController::class, 'redirectToFrontend']);

Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

// Ruta de fallback para React
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');

