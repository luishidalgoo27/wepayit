<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(private UserService $userService) {}
    
    public function update(UserUpdateRequest $req)
    {
        $this->userService->update($req);
        return response()->json(['message', 'User Updated Sucessfully']);
    }

    public function getUser(Request $request){
        $user = $this->userService->getUser($request);
        return response()->json($user, 200);
    }
}
