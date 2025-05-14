<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
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
     * @return User
     */
    public function createUser(AuthRequest $req)
{
    $user = User::create([
        'username' => $req->username,
        'name' => $req->name,
        'email' => $req->email,
        'password' => Hash::make($req->password),
    ]);

    event(new Registered($user));

    return response()->json(['message' => 'Usuario registrado correctamente. Por favor, verifica tu correo.'], 201);
}
    /**
     * Login The User
     * @param AuthRequest $req
     * @return User
     */
    public function loginUser(AuthRequest $req)
    {
        try {
            $user = User::where('email', $req->email)->first();

            if (!$user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Debes verificar tu correo electrónico antes de iniciar sesión.',
                ], 403);
            }


            if (!Auth::attempt($req->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'El correo y la contraseña no coinciden con nuestros registros.',
                ], 401);
            }

            $user = User::where('email', $req->email)->first();

            return response()->json([
                'status'  => true,
                'id'      => $user->id,
                'email'   => $user->email,
                'name'    => $user->name,
                'message' => 'Inicio de sesión correcto',
                'token'   => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

   public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Verificar el hash del email independientemente de la firma
        if (!hash_equals((string) $hash, sha1($user->email))) {
            return response()->json(['message' => 'Hash inválido'], 403);
        }

        // Comprobar si la URL tiene firma, pero no fallar si no es válida en producción
        if (!URL::hasValidSignature($request) && env('APP_ENV') !== 'production') {
            return response()->json(['message' => 'Enlace inválido o expirado'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Correo ya verificado']);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        // Redirigir a una página de éxito o a la aplicación
        if ($request->wantsJson()) {
            return response()->json(['message' => 'Correo verificado correctamente']);
        } else {
            // Redirigir a la aplicación frontend
            return redirect('https://wepayit.vercel.app/login?verified=1');
        }
    }

    public function verifyEmailAlternative(Request $request, $id, $hash)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Verificar solo el hash del email
        if (!hash_equals((string) $hash, sha1($user->email))) {
            return response()->json(['message' => 'Hash inválido'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Correo ya verificado']);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        // Redirigir a una página de éxito o a la aplicación
        if ($request->wantsJson()) {
            return response()->json(['message' => 'Correo verificado correctamente']);
        } else {
            // Redirigir a la aplicación frontend
            return redirect('https://wepayit.vercel.app/login?verified=1');
        }
    }


}
