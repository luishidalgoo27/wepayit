<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Division_gasto extends Model {
    use HasFactory;

    protected $table = 'divisiones_gastos';
    protected $fillable = ['gasto_id', 'user_id', 'cantidad_asignada', 'estado'];

    public function gasto() {
        return $this->belongsTo(Gasto::class);
    }

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
