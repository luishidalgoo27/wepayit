<?php

namespace App\Mail;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
        $url = url("/invitations/accept/{$this->invitation->invitation_code}");

        return $this->subject('Has sido invitado a un grupo')
            ->view('emails.group_invitation')
            ->with(['url' => $url]);
    }
}
