<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';
    protected $fillable = ['user_id', 'mensaje', 'tipo', 'importancia', 'estado'];

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
