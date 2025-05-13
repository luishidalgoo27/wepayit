<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $table = 'users';
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'avatar_public_id', 'telephone',
        'language', 'active_notifications', 'premium', 'username'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function ownedGroups()
    {
        return $this->hasMany(Group::class, 'owner_id');
    }

    
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'user_groups');
    }

    
    public function paidExpenses()
    {
        return $this->hasMany(Expense::class, 'paid_by');
    }


    public function expenseDivisions()
    {
        return $this->hasMany(Expense_division::class);
    }

    
    public function payments()
    {
        return $this->hasMany(Payment::class, 'payer_id');
    }

   
    public function paymentsInvolved()
    {
        return $this->hasMany(Payment_user::class);
    }

    
    public function groupInvitations()
    {
        return $this->hasMany(Invitation::class);
    }


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
