<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ConverterController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGroupController;

Route::get('/group', [GroupController::class, 'getGroup']);
Route::post('/register', [AuthController::class, 'createUser'])->name('auth.register');
Route::post('/login', [AuthController::class, 'loginUser'])->name('auth.login');
Route::patch('/expense', [ExpensesController::class, 'update']);
Route::post('/expense', [ExpensesController::class, 'create']);
Route::delete('/expense', [ExpensesController::class, 'delete']);
Route::get('/divisions', [ExpensesController::class, 'getDivisions']);
Route::post('/uploadImage', [UserController::class, 'uploadImage']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/user', [UserController::class, 'update']);
    Route::post('/deleteAvatar', [UserController::class, 'deleteImage']);
    
    Route::get('/groups', [GroupController::class, 'getGroupsUser']);
    Route::post('/group', [GroupController::class, 'create']);
    Route::patch('/group', [GroupController::class, 'update']);
    Route::delete('/group', [GroupController::class, 'delete']);
    Route::get('/getUsers', [GroupController::class, 'getUsers']);
    
    Route::delete('/deleteUser', [UserGroupController::class, 'deleteUser']);
    
    Route::post('/invitation', [UserGroupController::class, 'sendInvitation']);
    Route::get('/invitations/accept/{code}', [UserGroupController::class, 'acceptInvitation']);
    
    Route::get('/expense', [ExpensesController::class, 'getExpenses']);

    Route::post('/converter', [ConverterController::class, 'convert']);
});
