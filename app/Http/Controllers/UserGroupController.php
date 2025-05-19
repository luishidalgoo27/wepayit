<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserGroupService;
use App\Http\Requests\UserGroupDeleteRequest;
use App\Http\Requests\UserGroupSendInvitationRequest;
use Illuminate\Support\Facades\URL;

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

    public function acceptInvitation(String $code)
    {
        $data = $this->userGroupService->acceptInvitation($code);
        
        // Si es una petición AJAX o API, devolver JSON
        if (request()->expectsJson()) {
            return response()->json($data, 200);
        }
        
        // Si es una petición normal, redirigir al dashboard con mensaje de éxito
        $webUrl = config('app.frontend_url', env('VITE_URL', 'https://wepayit.es'));
        $redirectUrl = "{$webUrl}/dashboard?invitation_accepted=1";
        
        return redirect($redirectUrl);
    }

    public function deleteUser(UserGroupDeleteRequest $req)
    {
        $this->userGroupService->deleteUser($req);
        return response()->json(['message', 'User deleted sucessfully']);
    }

    public function userCount(Request $req)
    {
        $count = $this->userGroupService->userCount($req);
        return response()->json(['user_count' => $count], 200);
    }
}
