<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Grupo extends Model {
    use HasFactory;

    protected $table = 'grupos';
    protected $fillable = ['nombre', 'foto', 'owner_id', 'moneda'];

    public function usuarios() {
        return $this->belongsToMany(User::class, 'grupo_usuarios');
    }

    public function gastos() {
        return $this->hasMany(Gasto::class);
    }

    public function propietario() {
        return $this->belongsTo(User::class, 'owner_id');
    }
}

