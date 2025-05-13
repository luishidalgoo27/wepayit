<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class PayNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public User $user, public int $expenseId, public int $groupId)
    {
        //
    }

    public function build()
    {
        $url = url("/groups/$this->groupId/expenses/$this->expenseId/");

        return $this->subject('Me parece que debes un bizum...')
            ->view('emails.notification')
            ->with(['url' => $url]);
    }
}
