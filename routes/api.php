<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\InvitationController;

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/group', [GroupController::class, 'create']);
    Route::get('/group', [GroupController::class, 'get']);
    
    Route::post('/invitation', [InvitationController::class, 'addUser']);
    Route::get('/invitations/accept/{code}', [InvitationController::class, 'acceptInvitation']);
    Route::post('/deleteUser', [GroupController::class, 'deleteUser']);
});

