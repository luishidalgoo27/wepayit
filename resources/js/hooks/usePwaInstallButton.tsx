"use client"

import { useEffect, useState } from "react"

// Variable para almacenar el evento de instalación
let deferredPrompt: any = null

export function usePwaInstallButton(isMenuOpen: boolean) {
  // Estado para controlar si la app es instalable
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    function isIos() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    }

    function isInStandaloneMode() {
      // @ts-ignore
      return "standalone" in window.navigator && window.navigator.standalone
    }

    // Capturar el evento beforeinstallprompt
    function beforeInstallPromptHandler(e: any) {
      // Prevenir que Chrome muestre su propio diálogo automáticamente
      e.preventDefault()
      // Guardar el evento para usarlo más tarde
      deferredPrompt = e
      // Indicar que la app es instalable
      setIsInstallable(true)
    }

    // Escuchar el evento de instalación
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler)

    // Escuchar cuando la app se ha instalado
    window.addEventListener("appinstalled", () => {
      // Limpiar el prompt guardado
      deferredPrompt = null
      // Actualizar el estado
      setIsInstallable(false)
      console.log("¡PWA instalada correctamente!")
    })

    if (isMenuOpen) {
      const installBtn = document.getElementById("installBtn")
      const iosPopup = document.getElementById("iosAddToHome")

      if (installBtn) {
        installBtn.onclick = async () => {
          if (isIos() && !isInStandaloneMode()) {
            // Mostrar instrucciones para iOS
            if (iosPopup) iosPopup.style.display = "block"
          } else if (deferredPrompt) {
            try {
              // Mostrar el prompt de instalación
              deferredPrompt.prompt()
              // Esperar a que el usuario responda al prompt
              const { outcome } = await deferredPrompt.userChoice
              console.log(`Resultado de instalación: ${outcome}`)

              // Limpiar el prompt después de usarlo
              deferredPrompt = null
              setIsInstallable(false)
            } catch (error) {
              console.error("Error al mostrar el prompt de instalación:", error)
              alert("Para añadir a inicio, usa el menú de tu navegador.")
            }
          } else {
            // Si no hay prompt disponible, mostrar mensaje alternativo
            alert("Para añadir a inicio, usa el menú de tu navegador.")
          }
        }
      }
    }

    return () => {
      // Limpiar event listeners
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler)
      window.removeEventListener("appinstalled", () => {})
      const installBtn = document.getElementById("installBtn")
      if (installBtn) installBtn.onclick = null
    }
  }, [isMenuOpen])

  // Devolver si la app es instalable para poder mostrar/ocultar el botón
  return { isInstallable }
}
