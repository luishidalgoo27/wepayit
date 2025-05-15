import { useEffect } from "react";

export function usePwaInstallButton() {
  useEffect(() => {
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

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

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
      if (installBtn) installBtn.onclick = null;
    };
  }, []);
}