<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\User_group;
use App\Utils\GroupInvitation;
use App\Http\Requests\GroupInvitationRequest;

class InvitationService
{
    public function __construct( 
        private Group $group,
        private User_group $user_group,
        private GroupInvitation $groupInvitation,
        private Invitation $invitation
    ){}
        
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
}
?>