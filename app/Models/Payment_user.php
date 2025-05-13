<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment_user extends Model
{
    protected $table = 'payments_users';

    protected $fillable = [
        'payment_id',
        'user_id',
        'amount',
        'status',
        'expense_date',
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
