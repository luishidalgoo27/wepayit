<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
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
        'name', 'email', 'password', 'avatar', 'telephone',
        'languague', 'active_notifications', 'premium'
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

   
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    
    public function groupInvitations()
    {
        return $this->hasMany(Invitation::class);
    }

   
    public function sentPaymentRequests()
    {
        return $this->hasMany(Payment_request::class, 'applicant_id');
    }

    
    public function receivedPaymentRequests()
    {
        return $this->hasMany(Payment_request::class, 'recipient_id');
    }

    
    public function records()
    {
        return $this->hasMany(Record::class);
    }

    
    public function balancesAsDebtor()
    {
        return $this->hasMany(Balance_user::class, 'debtor_id');
    }

   
    public function balancesAsCreditor()
    {
        return $this->hasMany(Balance_user::class, 'creditor_id');
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
