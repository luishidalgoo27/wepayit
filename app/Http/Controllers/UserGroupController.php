<?php

namespace App\Http\Controllers;

use App\Services\UserGroupService;
use App\Http\Requests\UserGroupDeleteRequest;
use App\Http\Requests\UserGroupSendInvitationRequest;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserGroupController extends Controller
{
    public function __construct(
        private UserGroupService $userGroupService,
    ) {}
    
    public function sendInvitation(UserGroupSendInvitationRequest $req)
    {
        try {
            $result = $this->userGroupService->sendInvitation($req);
            return response()->json([
                'success' => true,
                'message' => 'Invitación enviada correctamente',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar la invitación: ' . $e->getMessage()
            ], 500);
        }
    }

    public function acceptInvitation(String $code, Request $request)
    {
        try {
            // Verificar si el usuario está autenticado
            if (!Auth::check()) {
                $webUrl = config('app.frontend_url', env('VITE_URL', 'https://wepayit.es'));
                $loginUrl = "{$webUrl}/login?redirect=" . urlencode("/accept-invitation/{$code}");
                
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Autenticación requerida',
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
                return response()->json([
                    'success' => true,
                    'message' => 'Invitación aceptada correctamente',
                    'data' => $data
                ]);
            }
            
            // Redirigir al dashboard con el mensaje apropiado
            return redirect('/dashboard')->with('success', '¡Has aceptado la invitación al grupo!');
            
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al aceptar la invitación: ' . $e->getMessage()
                ], 500);
            }
            
            return back()->with('error', 'Error al procesar la invitación: ' . $e->getMessage());
        }
    }

    public function deleteUser(UserGroupDeleteRequest $req)
    {
        try {
            $result = $this->userGroupService->deleteUser($req);
            return response()->json([
                'success' => true,
                'message' => 'Usuario eliminado del grupo correctamente',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el usuario del grupo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function userCount(Request $req)
    {
        try {
            $count = $this->userGroupService->userCount($req);
            return response()->json([
                'success' => true,
                'count' => $count
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el conteo de usuarios: ' . $e->getMessage()
            ], 500);
        }
    }
}
