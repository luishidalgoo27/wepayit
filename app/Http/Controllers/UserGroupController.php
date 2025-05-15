<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserGroupService;
use App\Http\Requests\UserGroupDeleteRequest;
use App\Http\Requests\UserGroupSendInvitationRequest;

class UserGroupController extends Controller
{
    public function __construct(
        private UserGroupService $userGroupService,
        ) {}
    
    public function sendInvitation(UserGroupSendInvitationRequest $req)
    {
        $user = $this->userGroupService->sendInvitation($req);
        return response()->json($user, 201);
    }

    public function acceptInvitation(String $code)
    {
        $data = $this->userGroupService->acceptInvitation($code);
        return response()->json($data, 200);
    }

    public function deleteUser(UserGroupDeleteRequest $req)
    {
        $this->userGroupService->deleteUser($req);
        return response()->json(['message', 'User deleted sucessfully']);
    }

    public function userCount(Request $req)
    {
        $count = $this->userGroupService->userCount($req);
        return response()->json(['user_count' => $count], 200); // Asegúrate de devolver un JSON con 'user_count'
    }
}
