<?php

namespace App\Services;

use App\Models\User;
use Cloudinary\Asset\Image;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Cloudinary\Transformation\Format;
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Delivery;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\SearchUsersRequest;
use App\Http\Requests\UploadImageRequest;
use App\Http\Requests\UserUpdateAvatarRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserService
{
    public function __construct(
        private User $user,
        private ImageUploader $imageUploader
    ) {
        $this->user = $user;
    }

    public function searchUsers(SearchUsersRequest $req)
    {
        $username = $req->username;


        if (!$username) {
            return response()->json(['error' => 'El campo username es requerido.'], 400);
        }

        $users = User::whereRaw('LOWER(username) LIKE ?', [strtolower($username) . '%'])->get();

        return $users;
    }

    public function update(UserUpdateRequest $req)
    {
        $user = $this->user::find(Auth::id());

        if (!$user){
            return response()->json(['message', 'User not found'], 404);
        }

        $user->update([
            'name' => $req->name ?? $user->name,
            'telephone' => $req->telephone ?? $user->telephone,
            'languague' => $req->language ?? $user->languague,
            'username' => $req->username ?? $user->username
        ]);

        return $user;
    }

    public function deleteImage()
    {
        $user = $this->user::find(Auth::id());
        $this->imageUploader->delete($user->avatar_public_id);
        $user->update([
            'avatar' => 'https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png',
            'avatar_public_id' => null
        ]);
        return $user;
    }

    public function updateAvatar(UserUpdateAvatarRequest $req )
    {
        $user = $this->user::find(Auth::id());
        
        $imageData = $req->hasFile('image') 
        ? $this->imageUploader->processImageUpload($req->file('image')) 
        : ['url' => $user->avatar, 'public_id' => $user->avatar_public_id];
        
        $this->imageUploader->delete($user['avatar_public_id']);
        
        $user->update([
            'avatar' => $imageData['url'],
            'avatar_public_id' => $imageData['public_id'],
        ]);

        return $user;
    }


    public function getUser(Request $request){
        return $request->user();
    }
}
?>