"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useAuth } from "@/context/AuthContext"
import { LogOut, User, Menu, X, Download } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { usePwaInstallButton } from "@/hooks/usePwaInstallButton"

const NAV_LINKS = [{ path: "/groups", name: "Grupos" }]

export const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Usar el hook mejorado y obtener si la app es instalable
  const { isInstallable } = usePwaInstallButton(isMenuOpen)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleConfirmLogout = () => {
    setShowConfirmPopup(true)
    setIsMenuOpen(false)
  }

  const handleCancelLogout = () => {
    setShowConfirmPopup(false)
  }

  const isProfilePage = location.pathname === "/user/edit-profile"

  const handleProfileClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-200 dark:bg-header-dark shadow-md pl-7 pr-7">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/groups" className="text-2xl font-bold tracking-wide hover:text-600 transition-colors">
          <img src="/wepayitlightlogo.png" className="w-15 h-auto" alt="" />
        </Link>

        {/* Actions (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/user/edit-profile"
            onClick={handleProfileClick}
            className={`p-2 rounded-full text-950 dark:text-50 transition transform hover:scale-150 duration-150 ${isProfilePage ? "text-green-600 dark:text-amber-600" : ""}`}
            title="Perfil"
          >
            <User size={20} />
          </Link>

          <button
            onClick={handleConfirmLogout}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-50 transition transform hover:scale-110 duration-200 cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeToggle />

          {/* Hamburger Button (Mobile) */}
          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 items-center backdrop-blur-xs bg-opacity-50 flex justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="w-72 bg-white dark:bg-950 h-full p-5 space-y-5" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>

            {/* Mostrar el botón solo si la app es instalable o en iOS */}
            {(isInstallable || /iphone|ipad|ipod/i.test(navigator.userAgent)) && (
              <button
                id="installBtn"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition mb-2 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Añadir a inicio
              </button>
            )}

            <Link
              to="/user/edit-profile"
              onClick={handleProfileClick}
              className={`p-2 rounded-full text-950 dark:text-50 transition transform hover:scale-110 duration-150 flex items-center gap-2 ${isProfilePage ? "text-green-600 dark:text-amber-600" : ""}`}
            >
              <User size={20} />
              Perfil
            </Link>
            <button
              onClick={handleConfirmLogout}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-50 transition transform hover:scale-110 duration-200 flex items-center gap-2 w-full"
            >
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md">
          <div className="bg-50 dark:bg-950 text-950 dark:text-100 p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-medium">¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Sí
              </button>
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
