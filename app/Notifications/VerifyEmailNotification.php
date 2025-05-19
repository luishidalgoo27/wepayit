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

        $baseUrl = app()->environment('production') 
            ? 'https://www.wepayit.es' 
            : config('app.url');
        
        $routePath = app()->environment('production')
            ? '/api/api/verify-email'  // Ruta para producción
            : '/api/verify-email';     // Ruta para local
        
        $baseVerificationUrl = $baseUrl . $routePath . '?id=' . $notifiable->getKey();
        
        return CustomUrlSigner::sign($baseVerificationUrl, now()->addDays(7));
    }
}