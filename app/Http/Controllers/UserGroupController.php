<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserGroupService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserGroupDeleteRequest;
use App\Http\Requests\UserGroupSendInvitationRequest;
use App\Http\Requests\UserGroupGenerateInvitationRequest;

class UserGroupController extends Controller
{
    public function __construct(
        private UserGroupService $userGroupService,
    ) {}
    
    public function sendInvitation(UserGroupSendInvitationRequest $req)
    {
        $user = $this->userGroupService->sendInvitation($req);
        return response()->json($user, 201);
    }

    public function generateInvitation(UserGroupGenerateInvitationRequest $req)
    {
        
    }
    
    public function acceptInvitation(String $code, Request $request)
    {
        // Verificar si el usuario está autenticado
        if (!Auth::check()) {
            $webUrl = config('app.frontend_url', env('VITE_URL', 'https://wepayit.es'));
            $loginUrl = "{$webUrl}/login?redirect=" . urlencode("/accept-invitation/{$code}");
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required',
                    'login_url' => $loginUrl,
                    'requires_auth' => true
                ], 401);
            }
            
            return redirect($loginUrl);
        }

        // Si el usuario está autenticado, procesar la invitación
        $data = $this->userGroupService->acceptInvitation($code);
        
        // Si es una petición AJAX o API, devolver JSON
        if ($request->expectsJson()) {
            return response()->json($data, 200);
        }
        
        // Redirigir al dashboard con el mensaje apropiado
        $webUrl = config('app.frontend_url', env('VITE_URL', 'https://wepayit.es'));
        $redirectUrl = "{$webUrl}/dashboard?";
        $redirectUrl .= $data['success'] ? 'success=' : 'error=';
        $redirectUrl .= urlencode($data['message']);
        
        return redirect($redirectUrl);
    }

    public function deleteUser(UserGroupDeleteRequest $req)
    {
        $this->userGroupService->deleteUser($req);
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function userCount(Request $req)
    {
        $count = $this->userGroupService->userCount($req);
        return response()->json(['user_count' => $count], 200);
    }
}
