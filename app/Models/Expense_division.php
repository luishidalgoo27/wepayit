<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense_division extends Model {
    use HasFactory;

    protected $table = 'expenses_divisions';

    protected $fillable = [
        'expense_id',
        'user_id',
        'assigned_amount',
        'status',
    ];

    protected $casts = [
        'assigned_amount' => 'decimal:2',
    ];

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
