import { useEffect } from "react";

// Variable global para guardar el evento
let deferredPrompt: any = null;

export function usePwaInstallButton(isMenuOpen: boolean) {
  useEffect(() => {
    function isIos() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }
    function isInStandaloneMode() {
      // @ts-ignore
      return ('standalone' in window.navigator) && window.navigator.standalone;
    }

    // Guardar el evento globalmente SOLO la primera vez
    function beforeInstallPromptHandler(e: any) {
      e.preventDefault();
      deferredPrompt = e;
    }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    // Cuando el menú se abre, asigna el evento al botón
    if (isMenuOpen) {
      const installBtn = document.getElementById('installBtn');
      const iosPopup = document.getElementById('iosAddToHome');

      if (installBtn) {
        installBtn.onclick = () => {
          if (isIos() && !isInStandaloneMode()) {
            if (iosPopup) iosPopup.style.display = 'block';
          } else if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
              deferredPrompt = null;
            });
          } else {
            alert('Para añadir a inicio, usa el menú de tu navegador.');
          }
        };
      }
    }

    // Limpieza
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      const installBtn = document.getElementById('installBtn');
      if (installBtn) installBtn.onclick = null;
    };
  }, [isMenuOpen]);
}