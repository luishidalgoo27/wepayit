<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifica tu correo - WePayIt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f0fdf4;
      color: #1a202c;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 128, 0, 0.08);
    }

    .header {
      text-align: center;
      background-color: #48bb78;
      color: #ffffff;
      padding: 20px;
      border-radius: 12px 12px 0 0;
    }

    h1 {
      font-size: 26px;
      font-weight: 800;
      margin: 0;
    }

    .content {
      padding: 30px 20px;
      font-size: 16px;
      color: #2f855a;
      line-height: 1.6;
      text-align: center;
    }

    .content strong {
      color: #22543d;
    }

    .button {
      display: inline-block;
      background-color: #38a169;
      color: #ffffff;
      padding: 14px 30px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      text-decoration: none;
      margin-top: 25px;
      transition: background-color 0.2s ease-in-out;
    }

    .button:hover {
      background-color: #2f855a;
    }

    .footer {
      font-size: 14px;
      text-align: center;
      color: #718096;
      margin-top: 30px;
      border-top: 1px solid #e6fffa;
      padding-top: 20px;
    }

    .footer a {
      color: #38a169;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .humor-note {
      font-style: italic;
      margin-top: 25px;
      background-color: #f7fafc;
      padding: 15px;
      border-radius: 8px;
      color: #4a5568;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Solo falta un paso para empezar a dividir gastos como un pro</h1>
    </div>

    <div class="content">
      <p>Hola, <strong>{{ $user->name }}</strong> 👋</p>
      <p>Antes de que puedas lanzarte a reclamarle a tus amigos lo que te deben, necesitamos que confirmes que este correo es realmente tuyo.</p>
      <a href="{{ $url }}" class="button">Verificar correo</a>
      <p>Después de hacer clic, te llevamos directo a la zona de inicio de sesión (con cariño, no con amenazas... todavía 😅).</p>
      <p>¿No has sido tú? Entonces no hagas nada, como ese colega que nunca paga. 🤷‍♂️</p>

      <div class="humor-note">
        “Verificar tu correo hoy puede evitar recordatorios pasivo-agresivos mañana. Tú decides, figura.”
      </div>
    </div>

    <div class="footer">
      <p>Con cariño,<br>El equipo de <strong>WePayIt</strong></p>
      <p><a href="{{ url('/') }}">Visita nuestro sitio web</a></p>
    </div>
  </div>
</body>
</html>
