<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserUpdateRequest;

class UserService
{
    public function __construct(
        private User $user
    ) {
        $this->user = $user;
    }
    public function update(UserUpdateRequest $req)
    {
        $user = $this->user::find(Auth::id());

        if (!$user){
            return response()->json(['message', 'User not found'], 404);
        }

        $user->update([
            'name' => $req->name ?? $user->name,
            'avatar' => $req->avatar ?? $user->avatar,
            'telephone' => $req->telephone ?? $user->telephone,
            'languague' => $req->language ?? $user->languague
        ]);

        return response()->json($user, 201);
    }

    public function getUser(Request $request){
        return $request->user();
    }

}
?>