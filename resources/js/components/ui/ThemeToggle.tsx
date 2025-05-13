import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-[#0C2724] transition transform hover:scale-150 duration-150 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-500" />}
    </button>
  );
}
