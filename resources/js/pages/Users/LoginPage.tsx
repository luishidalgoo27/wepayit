import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      toast.success("Has iniciado sesión correctamente");
    } catch (err: any) {
      const message = err.message || "Error desconocido";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 dark:text-700">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inicia sesión en <span className="text-[#8FE3C2]">Wepayit</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-md border ${
                error ? "border-red-400" : "border-gray-300"
              } focus:ring-[#8FE3C2] focus:border-[#8FE3C2]`}
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <a href="#" className="text-sm text-[#8FE3C2] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-md border ${
                error ? "border-red-400" : "border-gray-300"
              } focus:ring-[#8FE3C2] focus:border-[#8FE3C2]`}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#8FE3C2] text-white font-semibold rounded-full hover:bg-[#7dd8b4] transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#8FE3C2] hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
};
