<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balance_user extends Model
{
    protected $table = 'balance_users';

    protected $fillable = [
        'balance_id',
        'debtor_id',
        'creditor_id',
        'amount',
        'status',
    ];

    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }

    public function debtor()
    {
        return $this->belongsTo(User::class);
    }

    public function creditor()
    {
        return $this->belongsTo(User::class);
    }
}
