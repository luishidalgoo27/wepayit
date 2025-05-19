@extends('layouts.email')

@section('content')
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="Logo" style="max-width: 200px;">
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">¡Hola {{ $userInvited ? $userInvited->name : $invitation->guest_email }}!</h1>
        
        <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Has sido invitado por <strong>{{ $user->name }}</strong> a unirte al grupo 
            <strong>{{ $group->name }}</strong> en WePayIt.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
            <a href="{{ $acceptUrl }}" 
               style="display: inline-block; background-color: #4CAF50; color: white; 
                      text-decoration: none; padding: 12px 24px; border-radius: 4px; 
                      font-weight: bold; font-size: 16px;">
                Unirme al grupo
            </a>
        </div>
        
        <p style="color: #777777; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
            <a href="{{ $acceptUrl }}" style="color: #4CAF50; word-break: break-all;">{{ $acceptUrl }}</a>
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; color: #777777; font-size: 14px;">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p>Si crees que has recibido este correo por error, ignóralo.</p>
        </div>
    </div>
</div>
@endsection
