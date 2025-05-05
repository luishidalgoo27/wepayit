import { useState } from "react";
import { login } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const navigate = useNavigate()
  const { mutate } = useGetUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      await mutate()  
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
            Inicia sesión con tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm leading-6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm leading-6 font-medium text-gray-900">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm leading-6"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
