<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitudes_pago extends Model
{
    protected $table = 'solicitudes_pagos';
    protected $fillable = ['solicitante_id', 'destinatario_id', 'cantidad_solicitada', 'motivo', 'estado'];

    public function solicitante()
    {
        return $this->belongsTo(User::class);
    }

    public function destinatario()
    {
        return $this->belongsTo(User::class);
    }
}
