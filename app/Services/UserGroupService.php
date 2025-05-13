<?php

namespace App\Services;

use App\Models\Group;
use App\Models\Invitation;
use App\Models\User_group;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Utils\GroupInvitation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserGroupDeleteRequest;
use App\Http\Requests\UserGroupSendInvitationRequest;

class UserGroupService
{
    public function __construct( 
        private Group $group,
        private User_group $user_group,
        private GroupInvitation $groupInvitation,
        private Invitation $invitation
    ){}
        
    public function sendInvitation(UserGroupSendInvitationRequest $req)
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

    public function deleteUser(UserGroupDeleteRequest $req)
    {

        $group = $this->group::find($req->group_id);
        
        if (!$group){
            return response()->json(['message', 'Group not found'], 404);
        }

        if($group->owner_id !== Auth::id()){
            return response()->json(['message', 'You dont have permission to make this action'], 404);
        }
        
        $userGroup = $this->user_group::where('group_id', $req->group_id)
        ->where('user_id', $req->user_id)
        ->first();

        if (!$userGroup){
            return response()->json(['message', 'The user does not belong to the group'], 404);
        }
        
        $userGroup->delete();

        return response()->json($userGroup, 200);
    }

    public function userCount(Request $req)
    {
        $group = $this->group::find($req->group_id);

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        $userCount = $this->user_group::where('group_id', $req->group_id)->count();

        return $userCount;
    }
}
?>