import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { APP_URL } from "@/config"

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setUploading(true)
      await register(username, name, email, password);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
      console.error("Error al iniciar sesión:", error.message);
      toast.error(error.message || "Credenciales incorrectas");
      setUploading(false)
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = `${APP_URL}/auth/google`;    
  };

  const handleRedirectToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <main className=" flex items-center justify-center px-4 dark:text-50 text-950">
      <LoadingOverlay show={uploading}/>
      
      <div className="w-full max-w-md p-8 bg-[var(--color-50)] dark:bg-[var(--color-900)] border border-[var(--color-200)] dark:border-[var(--color-700)] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-950 dark:text-50 mb-6">
          Crear cuenta en <span className="dark:text-300 text-400">Wepayit</span>
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
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2] ${
              error ? "border-red-500" : "" }`}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]  ${
              error ? "border-red-500" : "" }`}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
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
              className={`mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]  ${
              error ? "border-red-500" : "" }`}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2] pr-10"
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
            className="clickButton w-full py-2 px-4  font-semibold rounded-full"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm dark:text-200 text-500 ">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-700 dark:text-50 hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-300 dark:bg-950 rounded-lg p-6 w-104.1 text-center">
            <h3 className="text-lg text-700 dark:text-100 font-semibold mb-4">¡Registro exitoso!</h3>
            <p className="dark:text-50 text-700 mb-6">
              Verifica tu correo electrónico antes de iniciar sesión.
            </p>
            <p className="text-xs dark:text-200 text-700 mb-6">
              *Mira en la bandeja de spam si no encuentras el correo*
            </p>
            <button
              onClick={handleRedirectToLogin}
              className="px-6 py-2 bg-950 text-50 dark:bg-600 dark:text-50 font-medium rounded-lg hover:bg-800 dark:hover:bg-500 transition"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
