import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { API_URL } from "@/config"

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Nuevo estado de error
  const [uploading, setUploading] = useState(false);

  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpia el error antes de intentar
    
    try {
      setUploading(true)
      await login(email, password);
      toast.success("Has iniciado sesión correctamente");
    } catch (error: any) {
      setError(error.message); // Guarda el error
      console.error("Error al iniciar sesión:", error.message);
      toast.error(error.message || "Credenciales incorrectas");
      setUploading(false)
    }
  };

  return (
    <main className=" flex items-center justify-center px-4">
    <LoadingOverlay show={uploading} message="Iniciando Sesión..."/>
      <div className="w-full max-w-md p-8 bg-[var(--color-50)] dark:bg-[var(--color-900)] border border-[var(--color-200)] dark:border-[var(--color-700)] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-950 dark:text-50 mb-6">
          Inicia sesión en <span className="text-400">Wepayit</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        <button
          onClick={() => handleGoogleLogin()}
          type="submit"
          className="clickButton w-full py-2 px-4 font-semibold rounded-full flex items-center justify-center gap-2"
        >
        <img
          src="/googleIcon.png"
          alt="Google logo"
          className="w-5 h-5"
        />
        Iniciar sesión con Google
        </button>

        <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-800 dark:bg-50"></div>
        <span className="px-4 text-950 dark:text-200 text-sm">O continuar con</span>
        <div className="flex-grow h-px bg-800 dark:bg-50"></div>
        </div>
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
              className={`mt-1 w-full px-4 py-2 rounded-md border focus:ring-[#8FE3C2] focus:border-[#8FE3C2] ${
              error ? "border-red-500" : "" }`}
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 w-full px-4 py-2 rounded-md border focus:ring-[#8FE3C2] focus:border-[#8FE3C2] pr-10  ${
                error ? "border-red-500" : "" }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center dark:text-50"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0a9 9 0 0118 0 9 9 0 01-18 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.216.417 4.563 1.138M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364 6.364L4.222 4.222" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

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
