<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use App\Services\CustomUrlSigner;

class VerifyEmailNotification extends BaseVerifyEmail
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        
        return (new MailMessage)
            ->view('emails.verify-email', ['user' => $notifiable, 'url' => $verificationUrl])
            ->subject('Verifica tu correo electrónico');
    }

    protected function verificationUrl($notifiable)
    {
        // Determinar la URL base correcta según el entorno
        $baseUrl = app()->environment('production') 
            ? 'https://wepayit.vercel.app' 
            : config('app.url');
        
        // Determinar la ruta correcta según el entorno
        $routePath = app()->environment('production')
            ? '/api/api/verify-email'  // Ruta para producción
            : '/api/verify-email';     // Ruta para local
        
        // Construir la URL base
        $baseVerificationUrl = $baseUrl . $routePath . '?id=' . $notifiable->getKey();
        
        // Firmar la URL con nuestro método personalizado
        return CustomUrlSigner::sign($baseVerificationUrl, now()->addDays(7));
    }
}