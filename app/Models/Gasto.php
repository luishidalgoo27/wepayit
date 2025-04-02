<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gasto extends Model {
    use HasFactory;

    protected $table = 'gastos';
    protected $fillable = ['titulo', 'cantidad', 'tipo_moneda', 'pagado_por', 'group_id', 'fecha', 'descripcion', 'categoria', 'url_recibo', 'estado', 'recurrente', 'frecuencia'];

    public function group()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }

    public function divisiones()
    {
        return $this->hasMany(Division_gasto::class);
    }
}
