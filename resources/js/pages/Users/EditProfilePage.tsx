import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserCog } from "lucide-react";
import { updateUser } from "@/services/user";
import { useGetUser } from "@/hooks/useGetUser";

export const EditProfilePage = () => {
  const { user, setUser, loading } = useGetUser()
  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setTelephone(user.telephone || "");
    }
  }, [user]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updated = await updateUser(
        name,
        telephone
      );

      toast.success("Perfil actualizado correctamente");

      setName(updated.name || "");
      setTelephone(updated.telephone || "");

      setUser(updated)

    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-36">
      <div className="flex flex-col justify-center items-center">
        <UserCog className="h-10 w-10" />
        <h2 className="text-lg font-bold mt-4">Editar Perfil</h2>
        <p className="text-sm mb-6">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
        <div>
          <label htmlFor="name" className="">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-200 dark:text-950 px-4 py-2 rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telephone" className="">Teléfono</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            className="w-full bg-200 dark:text-950 px-4 py-2 rounded focus:outline-none"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 dark:text-50  rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200 disabled:opacity-50"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};
