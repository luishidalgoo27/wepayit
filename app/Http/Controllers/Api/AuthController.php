<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\AuthRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create User
     * @param AuthRequest $req
     * @return User
     */
    public function createUser(AuthRequest $req)
{
    try {
        $user = User::create([
            'name'     => $req->name,
            'email'    => $req->email,
            'password' => Hash::make($req->password),
            'username' => $req->username
        ]);

        return response()->json([
            'status'  => true,
            'id'      => $user->id,
            'email'   => $user->email,
            'name'    => $user->name,
            'username'=> $user->username,
            'message' => 'Usuario creado correctamente',
            'token'   => $user->createToken("API TOKEN")->plainTextToken
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}


    /**
     * Login The User
     * @param AuthRequest $req
     * @return User
     */
    public function loginUser(AuthRequest $req)
    {
        try {
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
