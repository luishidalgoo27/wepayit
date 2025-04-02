<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago_user extends Model
{
    protected $table = 'pago_users';
    protected $fillable = ['pago_id', 'user_id', 'cantidad', 'estado', 'fecha_pago'];

    public function pago()
    {
        return $this->belongsTo(Pago::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
