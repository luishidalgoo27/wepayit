<?php

namespace App\Services;

use App\Models\Group;
use App\Models\User_group;
use Illuminate\Http\Request;
use App\Http\Requests\GroupRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\GroupRepository;

class GroupService
{
    public function __construct( 
        private Group $group,
        private User_group $user_group 
        ){}

    public function getAll(): array
    {
        return $this->group::all()->toArray();
    }

    public function create(GroupRequest $req)
    {
        $group = $this->group::create([
            'name' => $req->name,
            'photo' => $req->photo,
            'owner_id' => Auth::id(),
            'coin' => $req->coin         
        ]);

        $this->user_group::create([
            'group_id' => $group->id,
            'user_id' => Auth::id()
        ]);

        return $group;
    }

    public function get()
    {
        $idUser = Auth::id();
        $grupos = $this->user_group::where('user_id', $idUser)->get();
        return $grupos;

    }
}
?>