<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Invitación WePayIt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
   
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #f8f9fa;
      color: #333;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
   
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      width: 100% !important;
    }
   
    .card {
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      padding: 30px;
      margin: 20px auto;
      width: 100%;
      max-width: 600px;
    }
   
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
   
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: #2d3748;
      margin: 0 0 15px 0;
      line-height: 1.2;
    }
   
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 20px;
    }
   
    .invite-text {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
      color: #718096;
    }
   
    .group-name {
      font-weight: 600;
      color: #4299e1;
    }
   
    h2 {
      font-size: 20px;
      color: #2d3748;
      margin: 30px 0 15px 0;
      padding-left: 15px;
      border-left: 4px solid #4299e1;
    }
   
    .features {
      margin: 25px 0;
    }
   
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
   
    .feature-text {
      font-size: 16px;
      color: #718096;
      margin-left: 10px;
    }
   
    .cta-section {
      text-align: center;
      margin: 35px 0;
    }
   
    .btn {
      background: #4299e1;
      color: #ffffff;
      border: none;
      padding: 14px 30px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.2s ease;
    }
   
    .btn:hover {
      background: #3182ce;
    }
   
    .humor-note {
      font-style: italic;
      background: #f7fafc;
      padding: 15px;
      border-radius: 8px;
      margin: 25px 0;
      color: #4a5568;
    }
   
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #718096;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
   
    .tagline {
      font-size: 14px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 10px;
    }
   
    @media screen and (max-width: 600px) {
      .card {
        padding: 20px;
      }
     
      h1 {
        font-size: 24px;
      }
     
      .greeting {
        font-size: 18px;
      }
     
      .btn {
        width: 100%;
        max-width: 300px;
        padding: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="card">
      <div class="header">
        <h1>¡Te han invitado a un grupo en WePayIt!</h1>
      </div>
     
      <div class="greeting">
        Hola [Nombre del user],
      </div>
     
      <div class="invite-text">
        [Nombre del que invita] te ha invitado a unirte al grupo <span class="group-name">[Nombre del grupo]</span> en WePayIt.
      </div>
     
      <div class="features">
        <h2>¿Qué puedes hacer en este grupo?</h2>
        <div class="feature-item">
          <span class="feature-text">• <strong>Gestionar tus viajes y salidas con los demás miembros</strong></span>
        </div>
        <div class="feature-item">
          <span class="feature-text">• <strong>Controlar deudas</strong> : Ver lo que debes y lo que te deben</span>
        </div>

        <div class="feature-item">
          <span class="feature-text">• <strong>Compartir gastos de manera sencilla</strong></span>
        </div>

        <div class="feature-item">
          <span class="feature-text">• <strong>Participar en retos organizados por el grupo</strong> </span>
        </div>
      </div>
     
      <div class="cta-section">
        <a href="[URL_INVITACION]" class="btn">Unirme al grupo</a>
      </div>
     
      <div class="humor-note">
        "¡Quieren que te unas para que les pagues dinero! Y si no, pues nada, tú te lo pierdes, artista. 🍺"
      </div>
     
      <div class="footer">
        <div class="tagline">WePayIt - Porque siempre hay un listo al que "no le funciona el Bizum"</div>
        <p>Este mensaje es automático. Por favor, no respondas a este correo.</p>
        <p>Si no solicitaste esta invitación, puedes ignorar este mensaje.</p>
      </div>
    </div>
  </div>
</body>
</html>