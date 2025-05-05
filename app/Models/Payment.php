<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model {
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'expense_id',
        'payer_id',
        'amount',
        'payment_date',
        'status',
    ];

    public function payer()
    {
        return $this->belongsTo(User::class);
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function pagosUsuarios() {
        return $this->hasMany(Payment_user::class);
    }
}
