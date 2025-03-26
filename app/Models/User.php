<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $table = 'usuarios';
    protected $fillable = [
        'nombre', 'email', 'password', 'avatar', 'telefono',
        'preferencia_idioma', 'notificaciones_activas', 'activo'
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

    public function grupos() {
        return $this->belongsToMany(Grupo::class, 'grupo_usuarios');
    }

    public function gastosPagados() {
        return $this->hasMany(Gasto::class, 'pagado_por');
    }

    public function gastosSolicitados() {
        return $this->hasMany(Gasto::class, 'solicitado_por');
    }

    public function pagos() {
        return $this->hasMany(Pago::class, 'payer_id');
    }

    public function notificaciones() {
        return $this->hasMany(Notificacion::class);
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
