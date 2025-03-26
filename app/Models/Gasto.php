<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gasto extends Model {
    use HasFactory;

    protected $table = 'gastos';
    protected $fillable = [
        'titulo', 'cantidad', 'tipo_moneda', 'pagado_por', 'solicitado_por',
        'group_id', 'fecha', 'descripcion', 'categoria', 'url_recibo', 
        'estado', 'recurrente', 'frecuencia'
    ];
    protected $casts = ['recurrente' => 'boolean'];

    public function grupo() {
        return $this->belongsTo(Grupo::class);
    }

    public function pagador() {
        return $this->belongsTo(User::class, 'pagado_por');
    }

    public function solicitante() {
        return $this->belongsTo(User::class, 'solicitado_por');
    }

    public function divisiones() {
        return $this->hasMany(Division_gasto::class);
    }

    public function pagos() {
        return $this->hasMany(Pago::class);
    }
}
