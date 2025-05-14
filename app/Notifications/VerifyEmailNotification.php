<?php

namespace App\Notifications;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;

class VerifyEmailNotification extends BaseVerifyEmail
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        
        // Log para depuración
        Log::info('URL de verificación generada', ['url' => $verificationUrl]);
        
        return (new MailMessage)
            ->view('emails.verify-email', ['user' => $notifiable, 'url' => $verificationUrl])
            ->subject('Verifica tu correo electrónico');
    }

    protected function verificationUrl($notifiable)
    {
        // Asegurarse de que APP_URL está configurado correctamente
        $appUrl = config('app.url');
        if (empty($appUrl) || $appUrl === 'http://localhost') {
            $appUrl = 'https://wepayit.vercel.app';
        }
        
        // Generar URL firmada con tiempo de expiración extendido
        $url = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addDays(7), // Extender a 7 días en lugar de 60 minutos
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification())
            ]
        );
        
        // Reemplazar la URL base si es necesario
        if (strpos($url, 'http://localhost') === 0) {
            $url = str_replace('http://localhost', $appUrl, $url);
        }
        
        return $url;
    }
}