import { useEffect, useState } from "react";
import useGetUser from "@/hooks/useGetUser";

const inputClassName = "w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none";

type FormState = {
  name: string;
  email: string;
  telephone: string;
};

export const EditarPerfilPage = () => {
  const { user } = useGetUser();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    telephone: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        telephone: user.telephone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el usuario
    console.log("Formulario enviado:", form);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mt-4 text-center">
          {user?.name}
        </h2>
        <p className="text-sm text-gray-200 mb-6">{user?.email}</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-3"
        >
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className={inputClassName}
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputClassName}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="telephone">Teléfono</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              className={inputClassName}
              value={form.telephone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200"
          >
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
};
