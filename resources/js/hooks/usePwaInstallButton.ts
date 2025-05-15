import { useState, useEffect } from "react";

export function usePwaInstallButton(isMenuOpen: boolean) {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    let deferredPrompt: any = null;

    function isIos() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }
    function isInStandaloneMode() {
      // @ts-ignore
      return ('standalone' in window.navigator) && window.navigator.standalone;
    }

    function beforeInstallPromptHandler(e: any) {
      e.preventDefault();
      deferredPrompt = e;
      setIsInstallable(true);
    }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

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

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      setIsInstallable(false);
    };
  }, [isMenuOpen]);

  return { isInstallable };
}