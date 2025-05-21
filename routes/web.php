<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\Auth\GoogleController;

Route::get('/sitemap.xml', function () {
    $content = view('sitemap')->render();
    return Response::make($content, 200)->header('Content-Type', 'application/xml');
});

Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

// Ruta de fallback para React
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');

