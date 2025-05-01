<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGroupController;

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::patch('/updateUser', [UserController::class, 'update']);
    
    Route::get('/groups', [GroupController::class, 'getGroupsUser']);
    Route::post('/group', [GroupController::class, 'create']);
    Route::patch('/group', [GroupController::class, 'update']);
    Route::delete('/group', [GroupController::class, 'delete']);
    
    Route::delete('/deleteUser', [UserGroupController::class, 'deleteUser']);
    
    Route::post('/invitation', [UserGroupController::class, 'sendInvitation']);
    Route::get('/invitations/accept/{code}', [UserGroupController::class, 'acceptInvitation']);
    Route::post('/expense', [ExpensesController::class, 'create']);

});
