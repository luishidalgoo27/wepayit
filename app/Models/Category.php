<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $table = 'categories';
    protected $fillable = ['type'];

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
