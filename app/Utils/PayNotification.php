<?php

namespace App\Utils;

use App\Mail\PayNotificationMail;
use App\Models\Invitation;
use Illuminate\Support\Facades\Mail;

class PayNotification
{
    public function send(Invitation $invitation)
    {
        /* Mail::to($invitation->guest_email)->send(new PayNotificationMail()); */
    }
}
?>