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

  const handleLogout = () => {
    logout();
    navigate("/login");
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
            className="p-2 rounded-full bg-white text-[#0C2724] hover:bg-gray-300 transition"
            title="Perfil"
          >
            <User size={20} />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition "
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};
