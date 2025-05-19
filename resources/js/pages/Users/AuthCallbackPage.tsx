"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const { exchangeSessionForToken } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const sessionId = params.get("session")

        if (!sessionId) {
          throw new Error("No se encontró ID de sesión en la URL")
        }

        // Limpiar la URL para eliminar el parámetro de sesión
        window.history.replaceState({}, document.title, "/auth/callback")

        // Intercambiar el ID de sesión por el token
        await exchangeSessionForToken(sessionId)

        // Redirigir al usuario
        setTimeout(() => {
          navigate("/groups", { replace: true })
        }, 1000)
      } catch (error: any) {
        console.error("Error de autenticación:", error)
        setError(error.message || "Error durante la autenticación")

        // Redirigir al login en caso de error
        setTimeout(() => {
          navigate("/login", { replace: true })
        }, 3000)
      } finally {
        setLoading(false)
      }
    }

    handleCallback()
  }, [navigate, exchangeSessionForToken])

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {loading ? (
          <>
            <h2 className="text-xl font-bold mb-4">Procesando autenticación...</h2>
            <p>Por favor espera un momento.</p>
          </>
        ) : error ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-red-600">Error de autenticación</h2>
            <p>{error}</p>
            <p className="mt-2">Redirigiendo al inicio de sesión...</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-green-600">¡Autenticación exitosa!</h2>
            <p>Redirigiendo...</p>
          </>
        )}
      </div>
    </main>
  )
}

export default AuthCallbackPage
