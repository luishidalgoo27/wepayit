<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Recordatorio de Pago - WePayIt</title>
</head>
<body style="font-family: Poppins, Arial, sans-serif; margin: 0; padding: 0; background: #F2FBF8; color: #216457;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 30px;">

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 26px; font-weight: 800; color: #257C6A; margin: 0;">
          ¡Tienes un pago pendiente en WePayIt!
        </h1>
      </div>

      <div style="font-size: 20px; font-weight: 600; color: #319B83; margin-bottom: 20px;">
        Hola {{ $user->name }},
      </div>

      <div style="font-size: 16px; line-height: 1.6; color: #216457; margin-bottom: 30px;">
        ¿Te suena <strong style="color:#57BCA3;">{{ $expense->title }}</strong>?<br />
        Pues sí, aún debes <strong style="color:#319B83;">{{$expense->amount}}€</strong>. Y no, no se ha perdido en Bizumlandia.
      </div>

      <div style="text-align: center; margin: 35px 0;">
        <a href="{{$url}}" style="background: #57BCA3; color: #ffffff; border: none; padding: 14px 30px; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none; display: inline-block;">
          Pagar ahora
        </a>
      </div>

      <div style="font-style: italic; background: #E6E3FF; padding: 15px; border-radius: 8px; margin: 25px 0; color: #257C6A;">
        {{ $fraseAleatoria }}
      </div>

      <div style="text-align: center; font-size: 14px; color: #216457; margin-top: 30px; padding-top: 20px; border-top: 1px solid #A9E6D3;">
        <div style="font-size: 14px; font-weight: 600; color: #257C6A; margin-bottom: 10px;">
          WePayIt - Porque hasta el cuñao más pesado paga sus rondas
        </div>
        <p>Este mensaje se genera automáticamente. No hace falta que lo respondas, solo que pagues 😉</p>
        <p>Si crees que esto fue un error, ignóralo… pero con culpa.</p>
      </div>
    </div>
  </div>
</body>
</html>
