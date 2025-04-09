<?php

namespace App\Services;

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

        // Enviar el correo y agregar try/catch para ver errores
        try {
            $this->groupInvitation->send($invitation);
            Log::info('Correo de invitación enviado a: ' . $invitation->guest_email);
        } catch (\Exception $e) {
            Log::error('Error enviando correo: ' . $e->getMessage());
        }
        
        return $invitation;
    }
}
?>