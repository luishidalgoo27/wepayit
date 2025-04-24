<?php

namespace App\Http\Controllers;

use App\Services\GroupService;
use App\Services\UserGroupService;
use App\Http\Requests\GroupDeleteUserRequest;
use App\Http\Requests\GroupInvitationRequest;

class UserGroupController extends Controller
{
    public function __construct(
        private UserGroupService $userGroupService,
        ) {}

    public function addUser(GroupInvitationRequest $req)
    {
        $user = $this->userGroupService->addUser($req);
        return response()->json($user, 201);
    }

    public function acceptInvitation(String $code)
    {
        $data = $this->userGroupService->acceptInvitation($code);
        return response()->json($data, 200);
    }

    public function deleteUser(GroupDeleteUserRequest $req)
    {
        $this->userGroupService->deleteUser($req);
        return response()->json(['message', 'User deleted sucessfully']);
    }
}
