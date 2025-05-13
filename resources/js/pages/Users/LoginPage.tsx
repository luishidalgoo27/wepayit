import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  useEffect(() => {
    // Verificar si el popup debe mostrarse
    const showPopup = localStorage.getItem("showVerifyEmailPopup");
    if (showPopup) {
      toast.success(
        "Te has registrado correctamente. Por favor, verifica tu correo electrónico."
      );
      localStorage.removeItem("showVerifyEmailPopup"); // Eliminar el indicador
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      toast.success("Has iniciado sesión correctamente");
    } catch (err: any) {
      // Verificar si el error tiene una respuesta del backend
      const message =
        err.response?.data?.message || "Error desconocido. Inténtalo de nuevo.";
      setError(message); // Mostrar el mensaje del backend
      toast.error(message); // Mostrar el mensaje en el toast
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-[var(--color-50)] dark:bg-[var(--color-900)] border border-[var(--color-200)] dark:border-[var(--color-700)] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-950 dark:text-50 mb-6">
          Inicia sesión en <span className="text-400">Wepayit</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium "
              >
                Contraseña
              </label>
              <a
                href="#"
                className="text-sm text-700 dark:text-50 hover:underline"
              >
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
            className="w-full py-2 px-4 dark:bg-500 dark:text-50 bg-700 text-50 font-semibold rounded-full hover:bg-600 dark:hover:bg-200 dark:hover:text-950 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-500 dark:text-200 ">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-700 dark:text-50 hover:underline font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
};
