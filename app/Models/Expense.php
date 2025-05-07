<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model {
    use HasFactory;

    protected $table = 'expenses';

    protected $fillable = [
        'title',
        'amount',
        'paid_by',
        'group_id',
        'date',
        'description',
        'category',
        'receipt_url',
        'state',
        'recurrent',
        'frecuency',
    ];

    public function paid_by()
    {
        return $this->belongsTo(User::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
