<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment_request extends Model
{
    protected $table = 'payment_requests';

    protected $fillable = [
        'applicant_id',
        'recipient_id',
        'requested_amount',
        'reason',
        'status',
    ];

    public function applicant()
    {
        return $this->belongsTo(User::class);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class);
    }
}
