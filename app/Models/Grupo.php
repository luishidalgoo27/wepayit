<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Grupo extends Model {
    use HasFactory;

    protected $table = 'grupos';
    protected $fillable = ['nombre', 'foto', 'owner_id', 'moneda', 'estado'];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }
}

