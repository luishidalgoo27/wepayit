<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ConverterController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::post('/register', [AuthController::class, 'createUser'])->name('auth.register');
Route::post('/login', [AuthController::class, 'loginUser'])->name('auth.login');
Route::get('/verify-email', [AuthController::class, 'verifyEmail'])->name('verification.verify');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/user', [UserController::class, 'update']);
    Route::post('/updateAvatar', [UserController::class, 'updateAvatar']);
    Route::post('/deleteAvatar', [UserController::class, 'deleteImage']);

    Route::get('/fullUsers', [UserController::class, 'fullUsers']);

    Route::get('/groups', [GroupController::class, 'getGroupsUser']);
    Route::post('/get-group', [GroupController::class, 'getGroup']);
    Route::post('/group', [GroupController::class, 'create']);
    Route::put('/group', [GroupController::class, 'update']);
    Route::delete('/group', [GroupController::class, 'delete']);
    Route::post('/deletePhoto', [GroupController::class, 'deleteImage']);
    Route::post('/userCount', [UserGroupController::class, 'userCount']);
    
    Route::post('/getUsers', [GroupController::class, 'getUsers']);
    
    Route::post('/deleteUser', [UserGroupController::class, 'deleteUser']);
    
    Route::post('/invitation', [UserGroupController::class, 'sendInvitation']);
    Route::get('/invitations/accept/{code}', [UserGroupController::class, 'acceptInvitation']);
    
    Route::post('/notification', [NotificationController::class, 'sendNotification']);
       
    Route::post('/payments', [PaymentController::class, 'getPaymentUser']);
    Route::post('/paymentGroup', [PaymentController::class, 'getPaymentGroup']);
  
    Route::post('/expenses', [ExpensesController::class, 'getExpenses']);
    Route::post('/get-expense', [ExpensesController::class, 'getExpense']);
    Route::put('/expense', [ExpensesController::class, 'update']);
    Route::post('/expense', [ExpensesController::class, 'create']);
    Route::post('/delete-expense', [ExpensesController::class, 'delete']);
    
    Route::post('/divisions', [ExpensesController::class, 'getDivisions']);
    
    Route::get('/categories', [CategoryController::class, 'index']);
    
    Route::post('/converter', [ConverterController::class, 'convert']);
    Route::post('/search-users', [UserController::class, 'searchUsers']);
});


