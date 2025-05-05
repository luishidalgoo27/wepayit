import { useEffect, useState } from "react";
import useGetUser from "@/hooks/useGetUser";
import api from "@/utils/api";
import toast from "react-hot-toast";

const inputClassName = "w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none";

type FormState = {
  name: string;
  telephone: string;
};

export const EditarPerfilPage = () => {
  const { user, mutate } = useGetUser();

  const [form, setForm] = useState<FormState>({
    name: "",
    telephone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        telephone: user.telephone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put("/user", form); 
      await mutate();
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </main>
  );
};
