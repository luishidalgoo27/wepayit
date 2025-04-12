<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupDeleteUserRequest;
use App\Http\Requests\GroupInvitationRequest;
use App\Http\Requests\GroupRequest;
use App\Services\GroupService;
use App\Services\InvitationService;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function __construct(
        private GroupService $groupService,
        ) {}

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

    public function deleteUser(GroupDeleteUserRequest $req)
    {
        $this->groupService->deleteUser($req);
        return response()->json(['message', 'User deleted sucessfully']);
    }
}
