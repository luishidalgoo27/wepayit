<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NotificationService;
use App\Http\Requests\NotificationRequest;

class NotificationController extends Controller
{
    public function __construct(private NotificationService $notificationService) {}

    public function sendNotification(NotificationRequest $req)
    {
        $this->notificationService->sendNotification($req);
        return response()->json(['message' => 'Notification sent succesfully']);
    }
}
