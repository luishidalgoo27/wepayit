<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupDeleteUserRequest;
use App\Http\Requests\GroupInvitationRequest;
use App\Http\Requests\GroupRequest;
use App\Services\GroupService;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function __construct(
        private GroupService $groupService,
        ) {
        $this->groupService = $groupService; 
    }

    public function create(GroupRequest $req)
    {   
        $group = $this->groupService->create($req);
        return response()->json($group, 201);
    }

    public function get()
    {   
        $groups = $this->groupService->get();
        return response()->json($groups, 201);
    }

    public function addUser(GroupInvitationRequest $req)
    {
        $user = $this->groupService->addUser($req);
        return response()->json($user, 201);
    }

    public function acceptInvitation(String $code)
    {
        $data = $this->groupService->acceptInvitation($code);
        return response()->json($data, 200);
    }

    /* public function deleteUser(GroupDeleteUserRequest $req)
    {
        $user = $this->groupService->deleteUser($req);
        return response()->json($user, 201);
    } */
}
