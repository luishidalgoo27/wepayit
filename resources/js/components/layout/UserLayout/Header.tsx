import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { path: "/groups", name: "Grupos" },
];

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    setShowConfirmPopup(true);
    setIsMenuOpen(false); // Cierra el menú cuando se hace clic en cerrar sesión
  };

  const handleCancelLogout = () => {
    setShowConfirmPopup(false);
  };

  // Determinar si la ruta actual es "/user/edit-profile"
  const isProfilePage = location.pathname === "/user/edit-profile";

  const handleProfileClick = () => {
    setIsMenuOpen(false); // Cierra el menú cuando se hace clic en "Perfil"
  };

  usePwaInstallButton();

  return (
    <header className="sticky top-0 z-50 bg-200 dark:bg-header-dark shadow-md pl-7 pr-7">
      <nav className="container mx-auto  flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/groups"
          className="text-2xl font-bold tracking-wide hover:text-600 transition-colors"
        >
          <img src="/wepayitlightlogo.png" className="w-15 h-auto" alt="" />
        </Link>

        {/* Navigation Links (Visible on larger screens) */}


        {/* Actions (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/user/edit-profile"
            onClick={handleProfileClick} // Cierra el menú cuando se hace clic en "Perfil"
            className={`p-2 rounded-full text-950 dark:text-50 transition transform hover:scale-150 duration-150 ${isProfilePage ? 'text-green-600 dark:text-amber-600' : ''}`}
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
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2"
          >
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
          <div
            className="w-72 bg-white dark:bg-950 h-full p-5 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>

            {/* Botón Añadir a inicio (solo visible si soportado) */}
            <button
              id="installBtn"
              className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition mb-2 flex items-center justify-center gap-2"
            >
              Añadir a inicio
            </button>

            <Link
              to="/user/edit-profile"
              onClick={handleProfileClick}
              className={`p-2 rounded-full text-950 dark:text-50 transition transform hover:scale-110 duration-150 flex items-center gap-2 ${isProfilePage ? 'text-green-600 dark:text-amber-600' : ''}`}
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
          <div className="bg-50 dark:bg-950 text-950 dark:text-100  p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-medium">¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
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
  );
};

export function usePwaInstallButton() {
  useEffect(() => {
    let deferredPrompt: any = null;

    // Detectar iOS
    function isIos() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }
    // Detectar si ya está en modo standalone
    function isInStandaloneMode() {
      // @ts-ignore
      return ('standalone' in window.navigator) && window.navigator.standalone;
    }

    const installBtn = document.getElementById('installBtn');
    const iosPopup = document.getElementById('iosAddToHome');

    // Android/Chrome: guardar el evento
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    // Click en el botón
    if (installBtn) {
      installBtn.addEventListener('click', function () {
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
      });
    }

    // Limpieza
    return () => {
      if (installBtn) {
        installBtn.replaceWith(installBtn.cloneNode(true));
      }
    };
  }, []);
}
