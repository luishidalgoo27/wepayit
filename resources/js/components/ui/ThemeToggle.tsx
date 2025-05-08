import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-100 text-[#0C2724] hover:bg-gray-300 transition "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-500" />}
    </button>
  );
}
