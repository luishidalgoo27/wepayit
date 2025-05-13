import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { path: "/groups", name: "Grupos" },
];

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    setShowConfirmPopup(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmPopup(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-200 dark:bg-header-dark shadow-md pl-7 pr-7 ">
      <nav className="container mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/groups"
          className="text-2xl font-bold tracking-wide hover:text-600 transition-colors"
        >
          <img src="/public/wepayitlightlogo.png" className="w-15 h-auto" alt="" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className=" hover:text-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/user/edit-profile"
            className="p-2 rounded-full text-950 dark:text-50 transition transform hover:scale-150 duration-150"
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
      </nav>

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