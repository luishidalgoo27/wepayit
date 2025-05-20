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
        try {
            $result = $this->notificationService->sendNotification($req);
            return response()->json([
                'success' => true,
                'message' => 'Notificación enviada correctamente',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar la notificación: ' . $e->getMessage()
            ], 500);
        }
    }
}
