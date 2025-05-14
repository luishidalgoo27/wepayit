<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

class CustomUrlSigner
{
    public static function sign($url, $expiration = null)
    {
        $expiration = $expiration ?: now()->addMinutes(30);
        
        // Generar un token único
        $token = Str::random(40);
        
        // Crear payload
        $payload = [
            'url' => $url,
            'token' => $token,
            'expires' => $expiration->getTimestamp()
        ];
        
        // Encriptar payload
        $signature = Crypt::encrypt(json_encode($payload));
        
        // Añadir parámetros a la URL
        $separator = Str::contains($url, '?') ? '&' : '?';
        return $url . $separator . http_build_query([
            'expires' => $expiration->getTimestamp(),
            'token' => $token,
            'signature' => $signature
        ]);
    }
    
    public static function validate($request)
    {
        try {
            // Verificar que existen los parámetros necesarios
            if (!$request->has(['expires', 'token', 'signature'])) {
                return false;
            }
            
            // Verificar expiración
            if (now()->getTimestamp() > $request->query('expires')) {
                return false;
            }
            
            // Desencriptar firma
            $payload = json_decode(Crypt::decrypt($request->query('signature')), true);
            
            // Verificar token
            if ($payload['token'] !== $request->query('token')) {
                return false;
            }
            
            // Verificar URL base (ignorando diferencias en protocolo y dominio)
            $requestPath = parse_url($request->url(), PHP_URL_PATH);
            $payloadPath = parse_url($payload['url'], PHP_URL_PATH);
            
            return $requestPath === $payloadPath;
        } catch (\Exception $e) {
            Log::error('Error validando firma: ' . $e->getMessage());
            return false;
        }
    }
}