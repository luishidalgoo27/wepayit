import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await login(email, password);
    toast.success("Has iniciado sesión correctamente");
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    toast.error(error.message || "Credenciales incorrectas");
  }
};

  return (
    <main className=" flex items-center justify-center px-4">
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
              className={`mt-1 w-full px-4 py-2 rounded-md border focus:ring-[#8FE3C2] focus:border-[#8FE3C2]`}
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
              className={`mt-1 w-full px-4 py-2 rounded-md border focus:ring-[#8FE3C2] focus:border-[#8FE3C2]`}
            />
          </div>

          <button
            type="submit"
            className="clickButton w-full py-2 px-4 font-semibold rounded-full"
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
