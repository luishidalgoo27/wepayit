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
use App\Http\Requests\UploadImageRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserService
{
    public function __construct(
        private User $user,
        private ImageUploader $imageUploader
    ) {
        $this->user = $user;
    }
    
    public function update(UserUpdateRequest $req)
    {
        $user = $this->user::find(Auth::id());

        if (!$user){
            return response()->json(['message', 'User not found'], 404);
        }

        $imageData = $req->hasFile('image') 
        ? $this->imageUploader->processImageUpload($req->file('image')) 
        : ['url' => $user->avatar, 'public_id' => $user->avatar_public_id];
        
        $this->imageUploader->delete($user['avatar_public_id']);

        $user->update([
            'name' => $req->name ?? $user->name,
            'avatar' => $imageData['url'],
            'avatar_public_id' => $imageData['public_id'],
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


    public function getUser(Request $request){
        return $request->user();
    }
}
?>