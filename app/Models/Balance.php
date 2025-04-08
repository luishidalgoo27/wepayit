<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    protected $table = 'balances';
    protected $fillable = ['group_id'];

    public function group()
    {
        return $this->belongsTo(Grupo::class);
    }
}
