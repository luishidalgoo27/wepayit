import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { inviteUserToGroup, removeUserFromGroup, searchUsers } from "@/services/groups";
import { User } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";

export const ManagementPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { group } = useGetGroup(id);
  const { users, refetch: refreshUsers } = useGetUsers(id);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

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
    await inviteUserToGroup(id, userEmail);
    await refreshUsers();
  };

  const handleRemove = async (userId: string) => {
    await removeUserFromGroup(id, userId);
    await refreshUsers();
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
        {loadingSearch && <p className="text-sm text-[var(--color-700)] dark:text-[var(--color-300)]">Searching...</p>}

        {searchResults.length > 0 && (
          <ul className="space-y-2">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-[var(--color-100)] dark:bg-[var(--color-700)] p-3 rounded"
              >
                <span className="text-[var(--color-900)] dark:text-white">
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
          Group Members
        </h2>
        {sortedUsers.length > 0 ? (
          <ul className="space-y-2">
            {sortedUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-[var(--color-100)] dark:bg-[var(--color-700)] p-3 rounded"
              >
                <span className="text-[var(--color-900)] dark:text-white">
                  👤 {user.name} {user.id === group?.owner_id && <span className="italic text-sm">(Owner)</span>}
                </span>
                {user.id !== group?.owner_id && (
                  <button
                    onClick={() => handleRemove(String(user.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--color-700)] dark:text-[var(--color-300)]">No users in this group.</p>
        )}
      </section>
    </div>
  );
};
