"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { acceptInvitation } from "@/services/user"

export const InvitacionPage = () => {
  const { code } = useParams()
  const acceptUrl = code || "#"
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [autoAccepting, setAutoAccepting] = useState(false)

  // Intento automático de aceptación al cargar la página
  useEffect(() => {
    // Solo intentar auto-aceptar si tenemos un código válido
    if (code && code !== "#" && !autoAccepting) {
      setAutoAccepting(true)
      handleAcceptInvitation()
    }
  }, [code])

  // Función para manejar la aceptación de la invitación
  const handleAcceptInvitation = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      console.log("Intentando aceptar invitación con código:", acceptUrl)
      await acceptInvitation(acceptUrl)
      toast.success("¡Invitación aceptada con éxito!")
      navigate("/")
    } catch (error) {
      console.error("Error al aceptar la invitación:", error)
      toast.error("Error al aceptar la invitación. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br px-4">
      <div className="bg-50 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center max-w-2xl w-full">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-600 text-center mb-5">¡Te han invitado a un grupo!</h1>
          <p className="text-500 text-lg text-center">Únete y empieza a compartir gastos fácilmente con tus amigos.</p>
        </div>

        <button
          type="button"
          onClick={handleAcceptInvitation}
          disabled={isLoading}
          style={{
            background: "linear-gradient(to bottom, #2F274E, #03061C)",
            color: "#E6E3FF",
            padding: "1rem 2.5rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            width: "100%",
            fontWeight: "bold",
            fontSize: "1.125rem",
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Procesando..." : "Unirme al grupo"}
        </button>

        {isLoading && (
          <p className="mt-4 text-sm text-gray-500">Por favor, espera mientras procesamos tu solicitud...</p>
        )}
      </div>
    </div>
  )
}
