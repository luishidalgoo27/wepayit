<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        // Registrar información para depuración
        Log::info('Iniciando redirección a Google OAuth', [
            'redirect_uri' => config('services.google.redirect'),
            'scopes' => ['openid', 'profile', 'email']
        ]);
        
        // Especificar explícitamente los scopes y configurar prompt
        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->with([
                'prompt' => 'select_account',
                'access_type' => 'offline',
                'include_granted_scopes' => 'true'
            ])
            ->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            // Registrar la solicitud completa para depuración
            Log::info('Callback de Google recibido', [
                'query' => $request->all(),
                'headers' => $request->header()
            ]);
            
            // Si hay un error en la respuesta de Google, registrarlo
            if ($request->has('error')) {
                Log::error('Error devuelto por Google', [
                    'error' => $request->get('error'),
                    'error_description' => $request->get('error_description')
                ]);
                
                throw new \Exception('Error de Google: ' . $request->get('error_description', $request->get('error')));
            }
            
            // Usar stateless para evitar problemas con la sesión
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            Log::info('Usuario de Google obtenido correctamente', [
                'id' => $googleUser->getId(),
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName()
            ]);
            
            $user = User::where('email', $googleUser->getEmail())->first();
            
            if ($user) {
                if (empty($user->google_id)) {
                    $user->google_id = $googleUser->getId();
                    $user->auth_type = 'google';
                    $user->save();
                    
                    Log::info('Usuario existente actualizado con Google ID', [
                        'user_id' => $user->id
                    ]);
                }
            } else {
                $baseUsername = Str::slug($googleUser->getName());
                $username = $baseUsername;
                $counter = 1;
                
                while (User::where('username', $username)->exists()) {
                    $username = $baseUsername . $counter;
                    $counter++;
                }
                
                $randomPassword = Str::random(16);
                
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'username' => $username,
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make($randomPassword),
                    'google_id' => $googleUser->getId(),
                    'auth_type' => 'google',
                    'email_verified_at' => now(),
                    'avatar' => $googleUser->getAvatar() ?: null,
                ]);
                
                Log::info('Nuevo usuario creado con Google', [
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
            }
            
            if (!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }
            
            $token = $user->createToken('API TOKEN')->plainTextToken;
            
            $sessionId = Str::uuid()->toString();
            Cache::put('auth_token_' . $sessionId, $token, now()->addMinutes(5));
            
            // Obtener la URL del frontend desde las variables de entorno
            $frontendUrl = env('FRONTEND_URL', 'https://wepayit.es');
            
            // Registrar la URL de redirección para depuración
            Log::info('Redirigiendo al frontend', [
                'frontend_url' => $frontendUrl,
                'full_url' => $frontendUrl . '/auth/callback?session=' . $sessionId
            ]);
            
            // Usar la URL completa del frontend para la redirección
            return redirect($frontendUrl . '/auth/callback?session=' . $sessionId);
            
        } catch (\Exception $e) {
            // Registrar el error completo
            Log::error('Error en autenticación de Google: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            
            // Redirigir al frontend con el mensaje de error
            $frontendUrl = env('FRONTEND_URL', 'https://wepayit.es');
            return redirect($frontendUrl . '/login?error=' . urlencode('Error de autenticación: ' . $e->getMessage()));
        }
    }
    
    public function exchangeSessionForToken(Request $request)
    {
        try {
            $sessionId = $request->input('session_id');
            
            if (!$sessionId) {
                return response()->json(['error' => 'Session ID is required'], 400);
            }
            
            Log::info('Intentando intercambiar sesión por token', [
                'session_id' => $sessionId
            ]);
            
            $token = Cache::get('auth_token_' . $sessionId);
            
            if (!$token) {
                Log::warning('Sesión inválida o expirada', [
                    'session_id' => $sessionId
                ]);
                return response()->json(['error' => 'Invalid or expired session'], 401);
            }
            
            // Eliminar la sesión después de usarla
            Cache::forget('auth_token_' . $sessionId);
            
            // Obtener el usuario usando el token
            $user = null;
            try {
                $tokenModel = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
                if ($tokenModel) {
                    $user = $tokenModel->tokenable;
                    
                    Log::info('Usuario obtenido del token', [
                        'user_id' => $user->id,
                        'email' => $user->email
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Error al obtener usuario del token: ' . $e->getMessage());
            }
            
            return response()->json([
                'token' => $token,
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'username' => $user->username,
                    'avatar' => $user->avatar,
                ] : null
            ]);
        } catch (\Exception $e) {
            Log::error('Error en exchangeSessionForToken: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }
}
