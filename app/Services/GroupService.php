<?php

namespace App\Services;

use App\Http\Requests\GroupDeleteRequest;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\User_group;
use App\Utils\GroupInvitation;
use App\Http\Requests\GroupCreateRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\GroupUpdateRequest;
use App\Http\Requests\GroupGetRequest;


class GroupService
{
    public function __construct( 
        private Group $group,
        private User_group $user_group,
        private GroupInvitation $groupInvitation,
        private Invitation $invitation
    ){}

    public function create(GroupCreateRequest $req)
    {
        $group = $this->group::create([
            'name' => $req->name,
            'photo' => $req->photo,
            'owner_id' => Auth::id(),
            'currency_type' => $req->currency_type,
            'description' => $req->description,
                     
        ]);

        $this->user_group::create([
            'group_id' => $group->id,
            'user_id' => Auth::id()
        ]);

        return $group;
    }

    public function getGroupsUser(GroupGetRequest $req)
    {
        $user = Auth::user();
        $groups = $user->groups;
        return $groups;
    }

    public function update(GroupUpdateRequest $req)
    {
        $group = $this->group::find($req->group_id);

        if (!$group) {
            return response()->json(['message', 'Group not found'], 404);
        } 

        $group->update([
            'name' => $req->name ?? $group->name,
            'photo' => $req->photo ?? $group->photo,
            'currency_type' => $req->currency_type ?? $group->currency_type,
            'description' => $req->description ?? $group->description,
        ]);

        return $group;
    }

    public function delete(GroupDeleteRequest $req)
    {
        $group = $this->group::find($req->group_id);
        
        if (!$group) {
            return response()->json(['message', 'Group not found'], 404);
        } 

        if ($group->owner_id !== Auth::id()) {
            return response()->json(['message' => 'You do not have permission to delete this group'], 403);
        }

        $group->delete();

        return $group;
    }

}
?>