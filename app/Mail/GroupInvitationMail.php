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
    $api = env('VITE_URL');

    $userInvited = User::where('email', $this->invitation->guest_email)->first();
    $user = User::where('id', $this->invitation->user_id)->first();
    $group = Group::where('id', $this->invitation->group_id)->first();
    
    return $this->subject('Has sido invitado a un grupo')
        ->view('emails.group_invitation')
        ->with([
            'apiUrl' => $apiUrl,
            'invitation' => $this->invitation,
            'userInvited' => $userInvited,
            'user' => $user,
            'group' => $group
    ]);
}

}
