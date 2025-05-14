// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = res.data;

      if (!token) {
        throw new Error("No se recibió token");
      }

      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const register = async (username: string, name: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/register`, { username, name, email, password });

    } catch (error: any) {
      console.error("Error al registrarse:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Error al resgistrarse");
    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
