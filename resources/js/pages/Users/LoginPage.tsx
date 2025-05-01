export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#00110F] to-[#164236] flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Inicia sesión con tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8FE3C2]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Contraseña
              </label>
              <a href="#" className="text-sm font-semibold text-[#8FE3C2] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8FE3C2]"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#8FE3C2] px-4 py-2 font-semibold text-white hover:bg-[#7dd8b4] transition"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
