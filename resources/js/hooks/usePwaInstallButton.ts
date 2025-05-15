import { useEffect } from "react";

export function usePwaInstallButton(isMenuOpen: boolean) {
  useEffect(() => {
    if (!isMenuOpen) return; // Solo cuando el menú está abierto

    let deferredPrompt: any = null;

    function isIos() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }
    function isInStandaloneMode() {
      // @ts-ignore
      return ('standalone' in window.navigator) && window.navigator.standalone;
    }

    const installBtn = document.getElementById('installBtn');
    const iosPopup = document.getElementById('iosAddToHome');

    // Guardar el evento para Android/Chrome
    function beforeInstallPromptHandler(e: any) {
      e.preventDefault();
      deferredPrompt = e;
    }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

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

    // Limpieza
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      if (installBtn) installBtn.onclick = null;
    };
  }, [isMenuOpen]);
}