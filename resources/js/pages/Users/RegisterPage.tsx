import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register(username, name, email, password);
      // Mostrar el modal en lugar de redirigir directamente
      setShowModal(true);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Error desconocido. Inténtalo de nuevo.";
      setError(message);
      toast.error(message);
    }
  };

  const handleRedirectToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 dark:text-700">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear cuenta en <span className="text-[#8FE3C2]">Wepayit</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]"
            />
          </div>

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
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8FE3C2] focus:border-[#8FE3C2]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#8FE3C2] text-white font-semibold rounded-full hover:bg-[#7dd8b4] transition"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#8FE3C2] hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-300 dark:bg-950 rounded-lg p-6 w-96 text-center">
            <h3 className="text-lg text-700 dark:text-100 font-semibold mb-4">¡Registro exitoso!</h3>
            <p className="dark:text-50 text-700 mb-6">
              Te has registrado correctamente. Por favor, verifica tu correo electrónico antes de iniciar sesión.
            </p>
            <button
              onClick={handleRedirectToLogin}
              className="px-6 py-2 bg-950 text-50 dark:bg-600 dark:text-50 font-medium rounded-lg hover:bg-800 dark:hover:bg-500 transition"
            >
              Ir al login
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
