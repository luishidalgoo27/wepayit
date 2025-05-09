<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Recordatorio de Pago - WePayIt</title>
  <link rel="stylesheet" href="../../css/emails/notification.css">
</head>
<body>
  <div class="email-container">
    <div class="card">
      <div class="header">
        <h1>¡Tienes un pago pendiente en WePayIt!</h1>
      </div>

      <div class="greeting">
        Hola [Nombre del usuario],
      </div>

      <div class="payment-text">
        ¿Te suena <strong>[TÍTULO_DEL_PAGO]</strong>?<br />
        Pues sí, aún debes <strong>[CANTIDAD]€</strong>. Y no, no se ha perdido en Bizumlandia.
      </div>

      <div class="cta-section">
        <a href="[URL_PAGO]" class="btn">Pagar ahora</a>
      </div>

      <div class="humor-note" id="frase-cuñao">
        <!-- Aquí se mostrará la frase -->
      </div>

      <div class="footer">
        <div class="tagline">WePayIt - Porque hasta el cuñao más pesado paga sus rondas</div>
        <p>Este mensaje se genera automáticamente. No hace falta que lo respondas, solo que pagues 😉</p>
        <p>Si crees que esto fue un error, ignóralo… pero con culpa.</p>
      </div>
    </div>
  </div>

  <script src="../../js/emails/notification.js"></script>

</body>
</html>
