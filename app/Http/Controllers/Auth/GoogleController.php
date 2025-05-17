<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            // Buscar usuario por email
            $user = User::where('email', $googleUser->getEmail())->first();
            
            if ($user) {
                // Si el usuario existe pero no tiene google_id, actualízalo
                if (empty($user->google_id)) {
                    $user->google_id = $googleUser->getId();
                    $user->auth_type = 'google';
                    $user->save();
                }
            } else {
                // Crear nuevo usuario con username único
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
            }
            
            // Si el email no está verificado, marcarlo como verificado
            if (!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }
            
            // Generar token
            $token = $user->createToken('API TOKEN')->plainTextToken;
            
            // Crear una sesión temporal para almacenar el token
            $sessionId = Str::uuid()->toString();
            Cache::put('auth_token_' . $sessionId, $token, now()->addMinutes(5));
            
    
            return redirect('/auth/callback?session=' . $sessionId);
            
        } catch (\Exception $e) {
            Log::error('Google auth error: ' . $e->getMessage());
            return redirect('/login?error=google_auth');
        }
    }
    
    // Nuevo endpoint para intercambiar el ID de sesión por el token
    public function exchangeSessionForToken(Request $request)
    {
        $sessionId = $request->input('session_id');
        
        if (!$sessionId) {
            return response()->json(['error' => 'Session ID is required'], 400);
        }
        
        $token = Cache::get('auth_token_' . $sessionId);
        
        if (!$token) {
            return response()->json(['error' => 'Invalid or expired session'], 401);
        }
        
        // Eliminar la sesión después de usarla
        Cache::forget('auth_token_' . $sessionId);
        
        // Obtener datos del usuario
        $user = Auth::guard('sanctum')->user();
        
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
    }
}
