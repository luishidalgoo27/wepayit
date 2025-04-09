<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications';

    protected $fillable = [
        'user_id',
        'message',
        'type',
        'status',
        'send_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
