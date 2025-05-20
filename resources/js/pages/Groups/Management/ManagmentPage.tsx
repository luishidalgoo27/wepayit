import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteGroup, inviteUserToGroup, searchUsers } from "@/services/groups";
import { User } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export const ManagementPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { group } = useGetGroup(id);
  const { users, refetch: refreshUsers } = useGetUsers(id);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const isAdmin = currentUser?.id === group?.owner_id;

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        return;
      }
      setLoadingSearch(true);
      try {
        const results = await searchUsers(debouncedSearch);
        setSearchResults(results.slice(0, 3));
      } catch (error) {
        console.error("Error al buscar usuarios", error);
      } finally {
        setLoadingSearch(false);
      }
    };
    fetchResults();
  }, [debouncedSearch]);

  const handleInvite = async (userEmail: string) => {
    try {
      await inviteUserToGroup(id, userEmail);
      await refreshUsers();
      setSearchTerm("");
      setSearchResults([]);
      await Swal.fire({
        title: '¡Invitación enviada!',
        text: `Se ha enviado una invitación a ${userEmail}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error("Error al invitar al usuario:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar la invitación',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleRemoveGroup = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el grupo y no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar grupo",
        cancelButtonText: "Cancelar"
      });

      if (result.isConfirmed) {
        await deleteGroup(id);
        await Swal.fire({
          title: '¡Grupo eliminado!',
          text: 'El grupo se ha eliminado correctamente',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error al eliminar el grupo:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el grupo. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const sortedUsers = [...(users || [])].sort((a) =>
    a.id === group?.owner_id ? -1 : 1
  );

  return (
    <div className="box-2 max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
      {/* Buscar e invitar */}
      <section className="bg-[var(--color-50)] dark:bg-[var(--color-800)] p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-[var(--color-400)] dark:text-[var(--color-200)] mb-4">
          Invitar usuarios
        </h2>
        <input
          type="text"
          placeholder="Buscar por nickname..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-4 bg-white dark:bg-[var(--color-700)] text-[var(--color-900)] dark:text-white"
        />
        {loadingSearch && <p className="text-sm text-[var(--color-700)] dark:text-[var(--color-300)]">Buscando...</p>}

        {searchResults.length > 0 && (
          <ul className="space-y-2">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-[var(--color-100)] dark:bg-[var(--color-700)] p-3 rounded"
              >
                {user.avatar ? (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center ">
                    <img
                      src={user.avatar}
                      className="rounded-full object-cover border-4 border-white shadow"
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
                <span className="text-[var(--color-900)] mt-2 dark:text-white">
                  {user.username}
                </span>
                <button
                  onClick={() => handleInvite(user.email)}
                  className="clickButton px-3 py-1 rounded"
                >
                  Invitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Miembros del grupo */}
      <section className="bg-[var(--color-50)] dark:bg-[var(--color-800)] p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-[var(--color-400)] dark:text-[var(--color-200)] mb-4">
          Miembros del Grupo
        </h2>
        {sortedUsers.length > 0 ? (
          <ul className="space-y-2">
            {sortedUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-[var(--color-100)] dark:bg-[var(--color-700)] p-3 rounded"
              >
                <span className="text-[var(--color-900)] dark:text-white flex gap-4">
                  {user.avatar ? (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center ">
                      <img
                        src={user.avatar}
                        className="rounded-full object-cover border-4 border-white shadow"
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

                  <div className="mt-2">
                    {user.username} {user.id === group?.owner_id && <span className="italic text-sm">(Admin)</span>}
                  </div>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--color-700)] dark:text-[var(--color-300)]">No users in this group.</p>
        )}
      </section>

      {/* Botón borrar grupo - Solo visible para admin */}
      {isAdmin && (
        <button
          onClick={() => handleRemoveGroup(Number(id))}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
        >
          Borrar grupo
        </button>
      )}
    </div>
  );
};