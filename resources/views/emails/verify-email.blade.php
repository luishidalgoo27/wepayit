<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verifica tu correo – WePayIt</title>
</head>
<body style="font-family:Arial,sans-serif;background:#F2FBF8;color:#216457;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="font-size:24px;color:#257C6A;margin-bottom:20px;">¡Casi listo!</h1>
      <p>Hola {{ $user->name }},</p>
      <p>Gracias por registrarte en WePayIt. Para activar tu cuenta, haz clic en el botón de abajo:</p>
      <p style="text-align:center;margin:30px 0;">
        <a href="{{ $url }}" style="background:#57BCA3;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Verificar mi correo</a>
      </p>
      <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
      <p style="word-break:break-all;color:#319B83;">{{ $url }}</p>
      <hr style="margin:30px 0;border:none;border-top:1px solid #E6E3FF;">
      <p style="font-size:12px;color:#718096;">Si no solicitaste este correo, ignóralo. Este mensaje se envía automáticamente, por favor no respondas.</p>
    </div>
  </div>
</body>
</html>
