<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitacion extends Model
{
    protected $table = 'invitaciones_grupos';
    protected $fillable = ['group_id', 'user_id', 'email_invitado', 'estado'];

    public function grupo() {
        return $this->belongsTo(Grupo::class);
    }

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
