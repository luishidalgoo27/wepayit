import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Pencil } from "lucide-react";

import { useGetUser } from "@/hooks/useGetUser";
import { deleteAvatar, updateAvatar, updateUser } from "@/services/user";

export const EditProfilePage = () => {
  const { user, loading } = useGetUser();

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    if (!loading && user) {
      setName(user.name || "");
      setTelephone(user.telephone || "");
    }
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(name, telephone);
      toast.success("Usuario actualizado");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar();
      toast.success("Avatar eliminado");
    } catch (error) {
      toast.error("Error al eliminar avatar");
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await updateAvatar(file);
      toast.success("Avatar actualizado");
    } catch (error) {
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container max-w-md mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-36">
      <div className="flex flex-col justify-center items-center">
        <div className="relative group z-0 w-20 h-20">
          {/* Imagen o inicial */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar del usuario"
              className="h-full w-full rounded-full object-cover border-4 border-white shadow"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          {/* Botón eliminar avatar */}
          {user.avatar && (
            <button
              type="button"
              onClick={handleDeleteAvatar}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 z-20 hover:bg-red-700 hover:scale-110 transition-transform"
              title="Eliminar avatar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Overlay lápiz */}
          <div
            className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer z-10"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Pencil className="text-white w-5 h-5" />
            )}
          </div>

          {/* Input oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadAvatar}
          />
        </div>

        <h2 className="text-lg font-bold mt-4">Editar Perfil</h2>
        <p className="text-sm mb-6">{user.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
        <div>
          <label htmlFor="name">Nombre</label>
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
          <label htmlFor="telephone">Teléfono</label>
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
          className="w-full bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 dark:text-50 rounded-xl py-2 mt-2 shadow-md hover:brightness-110 transition-all duration-300 disabled:opacity-50"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};
