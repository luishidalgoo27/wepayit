<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balance_user extends Model
{
    protected $table = 'balance_users';
    protected $fillable = ['balance_id', 'deudor_id', 'creditor_id', 'cantidad', 'estado'];

    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }

    public function deudor()
    {
        return $this->belongsTo(User::class);
    }

    public function creditor()
    {
        return $this->belongsTo(User::class);
    }
}
