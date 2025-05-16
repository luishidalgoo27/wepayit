<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WePayIt</title>
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}" type="image/x-icon">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.tsx'])
  </head>
  <body class="bg-gradient-to-b from-200 to-400 dark:bg-gradient-to-b dark:from-950 dark:to-800 dark:text-50 text-950">
    <div id="root"></div>

    <!-- Popup instrucciones para añadir a inicio -->
    <div id="addToHomePopup" style="display:none; position:fixed; z-index:9999; inset:0; background:rgba(0,0,0,0.4);">
      <div style="background:#fff;max-width:350px;margin:80px auto;padding:24px 18px;border-radius:16px;box-shadow:0 2px 16px #0002;text-align:center;">
        <h2 style="color:#257C6A;font-size:1.2em;margin-bottom:12px;">Añadir a pantalla de inicio</h2>
        <div id="iosInstructions" style="display:none;">
          <p style="color:#216457;font-size:1em; display: flex; flex-direction: column; align-items: center;">
            Pulsa el botón <b>Compartir</b>
            <img src="/shareIOS.jpeg" alt="Compartir" style="height:1.8em;vertical-align:middle; margin: 8px auto;">
            y selecciona <b>"Añadir a pantalla de inicio"</b>
          </p>
        </div>
        <div id="androidInstructions" style="display:none;">
          <p style="color:#216457;font-size:1em;">
            Abre el menú <b>⋮</b> de tu navegador y selecciona <b>"Añadir a pantalla de inicio"</b>
          </p>
        </div>
        <button onclick="document.getElementById('addToHomePopup').style.display='none'" style="margin-top:18px;background:#257C6A;color:#fff;padding:8px 18px;border:none;border-radius:8px;font-weight:600;">Cerrar</button>
      </div>
    </div>
  </body>
</html>