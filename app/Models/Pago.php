<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pago extends Model {
    use HasFactory;

    protected $table = 'pagos';
    protected $fillable = ['gasto_id', 'payer_id', 'cantidad', 'metodo_pago', 'fecha_pago', 'estado'];

    public function gasto() {
        return $this->belongsTo(Gasto::class);
    }

    public function pagador() {
        return $this->belongsTo(User::class, 'payer_id');
    }

    public function pagosUsuarios() {
        return $this->hasMany(Pago_user::class);
    }
}
