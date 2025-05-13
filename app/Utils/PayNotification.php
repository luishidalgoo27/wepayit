<?php

namespace App\Utils;

use App\Models\User;
use App\Models\Invitation;
use App\Mail\PayNotificationMail;
use Illuminate\Support\Facades\Mail;

class PayNotification
{
    public function send(User $user)
    {
        Mail::to($user->email)->send(new PayNotificationMail($user));
    }
}
?>