<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadImageRequest;
use Cloudinary\Asset\Image;
use Illuminate\Http\Request;
use App\Services\UserService;
use Cloudinary\Transformation\Format;
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Delivery;
use App\Http\Requests\UserUpdateRequest;
use App\Utils\ImageUploader;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserController extends Controller
{

    public function __construct(private UserService $userService, private ImageUploader $imageUploader) {}
    
    public function update(UserUpdateRequest $req)
    {
        $user = $this->userService->update($req);
        return response()->json($user, 200);
    }

    public function getUser(Request $request){
        $user = $this->userService->getUser($request);
        return response()->json($user, 200);
    }

    public function deleteImage()
    {
        $user = $this->userService->deleteImage();
        return response()->json($user, 200);
    }
    

}
