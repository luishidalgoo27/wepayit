<?php

namespace App\Services;

use App\Http\Requests\GroupDeleteUserRequest;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\User_group;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Utils\GroupInvitation;
use App\Http\Requests\GroupRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Repositories\GroupRepository;
use App\Http\Requests\GroupInvitationRequest;

class GroupService
{
    public function __construct( 
        private Group $group,
        private User_group $user_group,
        private GroupInvitation $groupInvitation,
        private Invitation $invitation
    ){}
        
    public function getAll(): array
    {
        return $this->group::all()->toArray();
    }

    public function create(GroupRequest $req)
    {
        $group = $this->group::create([
            'name' => $req->name,
            'photo' => $req->photo,
            'owner_id' => Auth::id(),
            'coin' => $req->coin         
        ]);

        $this->user_group::create([
            'group_id' => $group->id,
            'user_id' => Auth::id()
        ]);

        return $group;
    }

    public function get()
    {
        $idUser = Auth::id();
        $groups = $this->user_group::where('user_id', $idUser)->get();
        return $groups;
    }

    public function deleteUser(GroupDeleteUserRequest $req)
    {

        $group = $this->group::find($req->group_id);
        
        if (!$group){
            return response()->json(['message', 'Group not found'], 404);
        }

        if($group->owner_id !== Auth::id()){
            return response()->json(['message', 'You dont have permission to make this action']);
        }
        
        $userGroup = $this->user_group::where('group_id', $req->group_id)
        ->where('user_id', $req->user_id)
        ->first();

        if (!$userGroup){
            return response()->json(['message', 'The user does not belong to the group']);
        }
        
        $userGroup->delete();

        return response()->json($userGroup, 200);
    }

}
?>