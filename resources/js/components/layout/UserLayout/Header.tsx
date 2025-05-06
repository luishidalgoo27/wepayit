import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { path: "/groups", name: "Grupos" },
];

export const Header = () => {
  const navigate = useNavigate();
  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-[#0C2724] text-white">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/groups" className="text-2xl font-bold text-white">WePayIt</Link>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-4">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions: Theme, Profile, Logout */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link
            to="/user/edit-profile"
            className="bg-white text-[#0C2724] px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Perfil
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
};
