<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_grupo extends Model
{
    protected $table = 'user_grupos';
    protected $fillable = ['group_id', 'user_id', 'fecha_ingreso'];

    public function group()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
