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
        'currency_type',
        'description',
        'category_id',
        'receipt_url',
        'receipt_url_public_id',
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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
