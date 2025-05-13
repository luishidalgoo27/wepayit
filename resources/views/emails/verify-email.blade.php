<!-- filepath: c:\wamp64\www\resources\views\emails\verify-email.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu correo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background-color: #8FE3C2;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            margin-top: 20px;
            background-color: #8FE3C2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
        }
        .button:hover {
            background-color: #7dd8b4;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
        }
        .footer a {
            color: #8FE3C2;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ¡Verifica tu correo electrónico!
        </div>
        <div class="content">
            <p>Hola, <strong>{{ $user->name }}</strong>:</p>
            <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el botón de abajo.</p>
            <a href="{{ $url }}" class="button">Verificar correo</a>
            <p>Después de verificar tu correo, serás redirigido automáticamente a la página de inicio de sesión.</p>
            <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        </div>
        <div class="footer">
            <p>Saludos,<br>El equipo de <strong>Wepayit</strong></p>
            <p><a href="{{ url('/') }}">Visita nuestro sitio web</a></p>
        </div>
    </div>
</body>
</html>