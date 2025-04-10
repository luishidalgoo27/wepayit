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

    public function addUser(GroupInvitationRequest $req)
    {
        $code = Str::uuid();

       $invitation = $this->invitation::create([
            'group_id'  => $req->group_id,
            'user_id'   => Auth::id(),
            'guest_email'   => $req->guest_email,
            'invitation_code'   => $code,
        ]);

        Log::info('Invitación creada: ', $invitation->toArray());

        try {
            $this->groupInvitation->send($invitation);
        } catch (\Exception $e) {
            abort(500, 'Error enviando correo: ' . $e->getMessage());
        }
        
        return $invitation;
    }

    public function acceptInvitation(String $code)
    {
        $invitation = $this->invitation::where('invitation_code', $code)->first();
        
        if (!$invitation) {
            abort(404, 'Invitation not found');
        }

        if ($invitation->guest_email !== Auth::user()->email){
            abort(403, 'Oops, this invitation is not for you');
        }

        $alreadyInGroup = $this->user_group::where('group_id', $invitation->group_id)
            ->where('user_id', Auth::id())
            ->exists();

        if ($alreadyInGroup) {
            return response()->json(['message' => 'You already belong to this group']);
        }

        $this->user_group::create([
            'group_id' => $invitation->group_id,
            'user_id' => Auth::id()
        ]);

        $invitation->delete();

        return response()->json(['message' => 'You have successfully joined the group']);
    }

    /* public function deleteUser(GroupDeleteUserRequest $req)
    {
        if($this->user_group->owner_id === Auth::id()){
            $user = $this->user_group::where('user_id', $req->user_id);
            $this->user_group::delete([$user]);
        } else {

        }

    } */

}
?>