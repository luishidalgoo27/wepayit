<?php

namespace App\Utils;

use App\Models\Invitation;
use App\Mail\GroupInvitationMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\GroupInvitationRequest;

class GroupInvitation
{
    public function send(Invitation $invitation)
    {
        Mail::to($invitation->guest_email)->send(new GroupInvitationMail($invitation));
    }
}
?>