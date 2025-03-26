<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago_user extends Model
{
    protected $table = 'pagos_users';
    protected $fillable = ['pago_id', 'user_id', 'cantidad', 'estado'];

    public function pago() {
        return $this->belongsTo(Pago::class);
    }

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
