import { useEffect, useState } from "react";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { UserCog } from "lucide-react";
import { User } from "@/types/user";
import { getUser } from "@/services/user";

export const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
        setName(data.name || "");
        setTelephone(data.telephone || "");
      } catch (error) {
        toast.error("Error al cargar el perfil");
        console.error(error);
      }
    };
  
    loadUser();
  }, []);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await api.put("/user", {
        name: name,
        telephone: telephone
      });
      setUser(res.data)
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    } 
  };

  if (!user) return null;

  return (
      <div className="container max-w-md mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="flex flex-col justify-center items-center">
          <UserCog className="h-10 w-10" />
          <h2 className="text-lg font-bold mt-4">Editar Perfil</h2>
          <p className="text-sm text-gray-200 mb-6">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
          <div>
            <label htmlFor="name" className="text-white">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="telephone" className="text-white">Teléfono</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200 disabled:opacity-50"
          >
            Guardar
          </button>
        </form>
      </div>
  );
};
