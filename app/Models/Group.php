<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model {
    use HasFactory;

    protected $table = 'groups';

    protected $fillable = [
        'name',
        'photo',
        'photo_public_id',
        'description',
        'currency_type',
        'owner_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}

