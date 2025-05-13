<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use App\Utils\PayNotification;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\NotificationRequest;

class NotificationService
{
    public function __construct(private PayNotification $payNotification) {}

    public function sendNotification(NotificationRequest $req)
    {
        $notification = [
            'group_id'  => $req->group_id,
            'email'   => $req->guest_email,
            'expense_id'   => $req->expense_id,
        ];
        $user = User::where('email', $notification['email'])->firstOrFail();
        
        /* Log::info('Notificacion enviada a: ', $user->email); */

        try {
            $this->payNotification->send($user, $notification['group_id'], $notification['expense_id']);
        } catch (\Exception $e) {
            abort(500, 'Error enviando correo: ' . $e->getMessage());
        }
        
        return $notification;
    }
}
?>