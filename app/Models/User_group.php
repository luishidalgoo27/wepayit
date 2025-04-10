<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_group extends Model
{
    protected $table = 'user_groups';
    protected $fillable = ['group_id', 'user_id'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
