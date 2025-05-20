<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InvitationController extends Controller
{
    /**
     * Redirige al frontend con el código de invitación
     */
    public function redirectToFrontend($code)
    {
        // URL del frontend donde se procesará la invitación
        $frontendUrl = env('VITE_URL') . "/invitation/{$code}";
        
        // Redirigir directamente al frontend
        return redirect()->away($frontendUrl);
    }
}
