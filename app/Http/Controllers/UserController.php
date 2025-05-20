<?php

namespace App\Http\Controllers;

use App\Models\User;
use Cloudinary\Asset\Image;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Services\UserService;
use Cloudinary\Transformation\Format;
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Delivery;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\SearchUsersRequest;
use App\Http\Requests\UploadImageRequest;
use App\Http\Requests\UserUpdateAvatarRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserController extends Controller
{
    public function __construct(private UserService $userService, private ImageUploader $imageUploader) {}
    
    public function update(UserUpdateRequest $req)
    {
        try {
            $user = $this->userService->update($req);
            return response()->json([
                'success' => true,
                'user' => $user,
                'message' => 'User Updated Successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUser(Request $request)
    {
        try {
            $user = $this->userService->getUser($request);
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error getting user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateAvatar(UserUpdateAvatarRequest $req)
    {
        try {
            $user = $this->userService->updateAvatar($req);
            return response()->json([
                'success' => true,
                'user' => $user,
                'message' => 'Avatar updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating avatar: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteImage()
    {
        try {
            $user = $this->userService->deleteImage();
            return response()->json([
                'success' => true,
                'user' => $user,
                'message' => 'Image deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting image: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function searchUsers(SearchUsersRequest $req)
    {
        try {
            $users = $this->userService->searchUsers($req);
            return response()->json([
                'success' => true,
                'users' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error searching users: ' . $e->getMessage()
            ], 500);
        }
    }
}
