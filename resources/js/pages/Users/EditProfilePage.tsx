import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetUser } from "@/hooks/useGetUser";
import { deleteAvatar, updateAvatar, updateUser } from "@/services/user";

export const EditProfilePage = () => {
  const { user, loading } = useGetUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && user) {
      setName(user.name || "");
      setUsername(user.username || "");
    }
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name === (user.name || "") &&
      username === (user.username || "")
    ) {
      toast("No hay cambios para guardar");
      return;
    }
    try {
      await updateUser(name, username);
      toast.success("Usuario actualizado");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoadingAvatar(true);
      await deleteAvatar();
      toast.success("Avatar eliminado");
      navigate(0);
    } catch (error) {
      toast.error("Error al eliminar avatar");
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await updateAvatar(file);
      toast.success("Avatar actualizado");
      navigate(0);
    } catch (error) {
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <LoadingOverlay show={uploading} message="Actualizando Avatar..."/>
      <LoadingOverlay show={loadingAvatar} message="Eliminando Avatar..."/>


      <div className="container max-w-md mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 ">
        <div className="flex flex-col justify-center items-center">
          <div className="relative group z-0 w-20 h-20">
            {/* Imagen o inicial */}
            {user.avatar ? (
              <div className="w-20 h-20 rounded-full flex items-center justify-center">
                <img
                  src={user.avatar}
                  className="w-full h-full rounded-full object-cover border-4 border-500 dark:border-600 shadow"
                  alt="Avatar del usuario"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png"
                  className="rounded-full object-cover border-4 border-white shadow"
                  alt="Avatar del usuario"
                />
              </div>
            )}
            {/* Botón eliminar avatar */}
            {user.avatar && (
              <button
                type="button"
                onClick={() => handleDeleteAvatar()}
                onMouseEnter={() => setHoverDelete(true)}
                onMouseLeave={() => setHoverDelete(false)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 z-20 hover:bg-red-700 hover:scale-125 transition-transform duration-200"
                title="Eliminar avatar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {/* Lápiz solo si no está el mouse sobre el borrar */}
            {!hoverDelete && (
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
            )}
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
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full bg-200 dark:text-950 px-4 py-2 rounded focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="clickButton w-full py-2 mt-2 shadow-md hover:brightness-110 disabled:opacity-50"
          >
            Guardar
          </button>
        </form>
      </div>

    </div>
  );
};
