"use client"

import { useState, useRef } from "react"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"

interface RouletteWheelProps {
  users: User[]
  onSpin?: (selectedUser: User | null) => void
}

export function RouletteWheel({ users, onSpin }: RouletteWheelProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  // Colores para los segmentos de la ruleta
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-emerald-500",
  ]

  const spinWheel = () => {
    if (users.length === 0 || spinning) return

    setSpinning(true)
    setSelectedUser(null)

    // Número de rotaciones (entre 5 y 10)
    const rotations = 5 + Math.random() * 5
    const newRotation = rotation + rotations * 360

    setRotation(newRotation)

    // Calcular el usuario seleccionado después del giro
    setTimeout(() => {
      // Calcular qué segmento está en la posición del indicador
      const segmentAngle = 360 / users.length
      const normalizedRotation = newRotation % 360
      const winnerIndex = Math.floor(users.length - ((normalizedRotation / segmentAngle) % users.length))
      const winner = users[winnerIndex % users.length]

      setSelectedUser(winner)
      setSpinning(false)

      if (onSpin) {
        onSpin(winner)
      }
    }, 5000) // Tiempo de la animación
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">¿Quién paga esta noche?</CardTitle>
        <CardDescription className="text-lg">
          Gira la ruleta y deja que el destino decida quién pagará la cuenta esta noche.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {users.length > 0 ? (
          <div className="relative w-full max-w-md aspect-square mb-8">
            {/* Indicador (flecha) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <ArrowDown className="h-8 w-8 text-black dark:text-white" />
            </div>

            {/* Ruleta */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full border-4 border-gray-300 dark:border-gray-700 overflow-hidden relative"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 5s cubic-bezier(0.17, 0.67, 0.83, 0.67)" : "none",
              }}
            >
              {users.map((user, index) => {
                const angle = (360 / users.length) * index
                const colorIndex = index % colors.length

                return (
                  <div
                    key={user.id}
                    className={`absolute w-full h-full origin-bottom-center ${colors[colorIndex]}`}
                    style={{
                      clipPath: `polygon(50% 0%, 50% 50%, ${50 + 50 * Math.cos(((angle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((angle + 360 / users.length - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle + 360 / users.length - 90) * Math.PI) / 180)}%)`,
                    }}
                  >
                    <div
                      className="absolute text-white font-bold text-center"
                      style={{
                        left: "50%",
                        top: "25%",
                        transform: `rotate(${angle}deg) translateX(-50%)`,
                        transformOrigin: "left center",
                        width: "40%",
                        fontSize: users.length > 8 ? "0.75rem" : "1rem",
                      }}
                    >
                      {user.name}
                    </div>
                  </div>
                )
              })}

              {/* Centro de la ruleta */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300 dark:border-gray-700 z-10"></div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 my-8">No hay usuarios en este grupo.</p>
        )}

        {selectedUser && (
          <div className="text-center mb-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg w-full">
            <p className="text-2xl font-bold">🎉 ¡{selectedUser.name} paga esta noche! 🎉</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="lg" onClick={spinWheel} disabled={spinning || users.length === 0} className="px-8">
          {spinning ? "Girando..." : "Girar ruleta"}
        </Button>
      </CardFooter>
    </Card>
  )
}
