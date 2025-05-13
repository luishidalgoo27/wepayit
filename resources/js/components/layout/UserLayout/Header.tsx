import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 bg-200 dark:bg-header-dark shadow-md">
      <nav className="container mx-auto  flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/groups"
          className="text-2xl font-bold tracking-wide hover:text-600 transition-colors"
        >
          <img src="/public/wepayitlightlogo.png" className="w-15 h-auto" alt="" />
        </Link>

        {/* Navigation Links (Visible on larger screens) */}
        <ul className=" items-center gap-6">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="hover:text-600 transition-colors font-medium pl-14"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

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
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
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
            <Link
              to="/user/edit-profile"
              onClick={handleProfileClick} // Cierra el menú cuando se hace clic en "Perfil"
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
