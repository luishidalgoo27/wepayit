<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupInvitationRequest;
use App\Services\GroupService;
use App\Services\InvitationService;

class InvitationController extends Controller
{
    public function __construct(
        private InvitationService $invitationService,
        ) {}

    public function addUser(GroupInvitationRequest $req)
    {
        $user = $this->invitationService->addUser($req);
        return response()->json($user, 201);
    }

    public function acceptInvitation(String $code)
    {
        $data = $this->invitationService->acceptInvitation($code);
        return response()->json($data, 200);
    }
}
