<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\AuthRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create User
     * @param AuthRequest $req
     * @return User
     */
    public function createUser(Request $request)
{
    $request->validate([
        'username' => 'required|string|max:255|unique:users',
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    $user = User::create([
        'username' => $request->username,
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user)); // Enviar correo de verificación

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

}
