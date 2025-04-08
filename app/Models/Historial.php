<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $table = 'historiales';
    protected $fillable = ['user_id', 'tipo', 'descripcion', 'cantidad', 'fecha'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
