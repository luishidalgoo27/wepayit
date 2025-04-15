<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupDeleteRequest;
use App\Services\GroupService;
use App\Http\Requests\GroupRequest;
use App\Http\Requests\GroupUpdateRequest;


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

    public function getGroupsUser()
    {   
        $groups = $this->groupService->getGroupsUser();
        return response()->json($groups, 201);
    }

    public function update(GroupUpdateRequest $req)
    {
        $group = $this->groupService->update($req);
        return response()->json($group, 201);
    }

    public function delete(GroupDeleteRequest $req)
    {
        $group = $this->groupService->delete($req);
        return response()->json($group, 201);
    }
    
}
