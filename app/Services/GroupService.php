<?php

namespace App\Services;

use App\Models\Group;
use Illuminate\Http\Request;
use App\Http\Requests\GroupRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\GroupRepository;

class GroupService
{
    public function __construct( 
        private Group $group, 
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

        return $group;
    }
}
?>