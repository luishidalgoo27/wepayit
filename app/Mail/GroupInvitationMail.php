<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Group;
use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class GroupInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Invitation $invitation)
    {
        //
    }

    public function build()
    {
        $apiUrl = env('VITE_API_URL');
        
        $url = $apiUrl."/invitations/accept/{$this->invitation->invitation_code}";
        $rute = $apiUrl."/invitation/{$this->invitation->invitation_code}";

        $userInvited = User::where('email', $this->invitation->guest_email)->first();
        $user = User::where('id', $this->invitation->user_id)->first();
        $group = Group::where('id', $this->invitation->group_id)->first();
        
        return $this->subject('Has sido invitado a un grupo')
            ->view('emails.group_invitation')
            ->with([
                'rute' => $rute,
                'url' => $url,
                'userInvited' => $userInvited,
                'user' => $user,
                'group' => $group
        ]);
    }
}
