<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $table = 'records';

    protected $fillable = [
        'user_id',
        'type',
        'description',
        'amount',
        'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
