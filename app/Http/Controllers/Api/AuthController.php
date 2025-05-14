<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
  /**
 * Create User
 * @param AuthRequest $req
 * @return \Illuminate\Http\JsonResponse
 */
public function createUser(AuthRequest $req)
{
    try {
        // Registrar información para depuración
        Log::info('Intento de registro de usuario', [
            'email' => $req->email,
            'username' => $req->username
        ]);
        
        $user = User::create([
            'username' => $req->username,
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
        ]);

        event(new Registered($user));
        
        // Registrar éxito
        Log::info('Usuario registrado correctamente', ['user_id' => $user->id]);

        return response()->json(['message' => 'Usuario registrado correctamente. Por favor, verifica tu correo.'], 201);
    } catch (\Illuminate\Database\QueryException $e) {
        // Error específico de base de datos (como duplicados)
        $errorCode = $e->errorInfo[1] ?? null;
        
        // Código 1062 es para entrada duplicada en MySQL
        if ($errorCode == 1062) {
            Log::error('Error de registro: entrada duplicada', [
                'error' => $e->getMessage(),
                'email' => $req->email
            ]);
            return response()->json([
                'status' => false,
                'message' => 'Este correo o nombre de usuario ya está registrado.',
                'error_type' => 'duplicate_entry'
            ], 409); // Conflict
        }
        
        Log::error('Error de base de datos durante el registro', [
            'error' => $e->getMessage(),
            'code' => $errorCode
        ]);
        
        return response()->json([
            'status' => false,
            'message' => 'Error al registrar usuario. Problema con la base de datos.',
            'error_type' => 'database_error',
            'details' => config('app.debug') ? $e->getMessage() : null
        ], 500);
    } catch (\Exception $e) {
        // Capturar cualquier otra excepción
        Log::error('Error general durante el registro de usuario', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'status' => false,
            'message' => 'Error al registrar usuario.',
            'error_type' => 'server_error',
            'details' => config('app.debug') ? $e->getMessage() : null
        ], 500);
    }
}
}
