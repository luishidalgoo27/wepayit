<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\UserUpdateRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        if (!$request->hasFile('image')) {
            return response()->json(['error' => 'No se recibió archivo'], 400);
        }

        $image = $request->file('image');

        $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();

        return response()->json([
            'url' => $uploadedFileUrl,
        ]);
    }


}
