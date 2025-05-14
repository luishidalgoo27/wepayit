import { getGroups, getUserCount } from "@/services/groups";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Group } from "@/types/group";

export const GroupsPage = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [membersCount, setMembersCount] = useState<{ [key: number]: number }>({}); // Estado para almacenar el número de miembros por grupo

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await getGroups();
                setGroups(data);

                const membersPromises = data.map(async (group) => {
                    const count = await getUserCount(group.id); 
                    return { groupId: group.id, count };
                });

                const membersData = await Promise.all(membersPromises);
                const membersMap = membersData.reduce((acc, { groupId, count }) => {
                    acc[groupId] = count;
                    return acc;
                }, {} as { [key: number]: number });

                setMembersCount(membersMap);
            } catch (error) {
                toast.error("Error al cargar los grupos o los miembros");
                console.error(error);
            }
        };

        loadGroups();
    }, []);

    return (
        <div className="container max-w-4xl mx-auto  space-y-6 px-8">
            {/* Título y subtítulo */}
            <h1 className="text-left text-5xl font-bold mb-2">
                wepayit <span className="text-lg font-medium">by Medac</span>
            </h1>
            <p className="text-950 dark:text-300 text-lg">
                Gestiona tus grupos de manera sencilla y eficiente.
            </p>

            {/* Botón para crear un nuevo grupo */}
            <Link
                to="/groups/create-group"
                className="clickButton block w-full text-center font-semibold py-3 rounded-xl shadow-md"
            >
                + Nuevo wepayit
            </Link>

            {/* Contador de grupos */}
            <p className="text-800 dark:text-500 text-sm text-center">
                Perteneces a <span className="font-semibold">{groups.length}</span> wepayit(s).
            </p>

            {/* Grupos */}
            <div className="grid gap-4 sm:grid-cols-2">
                {groups.map((group) => (
                    <Link
                        key={group.id}
                        to={`/groups/${group.id}`}
                        className="box p-4 shadow-md flex flex-col gap-2 transition"
                    >
                        <div className="flex items-center gap-4">
                            {group.photo ? (
                                <img
                                    className="w-10 h-10 rounded-full border border-[var(--color-300)] dark:border-[var(--color-600)]"
                                    src={group.photo}
                                    alt="Rounded avatar"
                                />
                            ) : (
                                <div className="relative w-10 h-10 overflow-hidden bg-[var(--color-200)] dark:bg-[var(--color-800)] rounded-full">
                                    <svg
                                        className="absolute w-12 h-12 text-[var(--color-400)] dark:text-[var(--color-600)] -left-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            <h2 className="text-xl font-semibold text-[var(--color-600)] dark:text-[var(--color-100)]">
                                {group.name}
                            </h2>
                        </div>
                        <p className="text-sm text-[var(--color-700)] dark:text-[var(--color-200)]">
                            {group.description || "Sin descripción"}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-[var(--color-500)] dark:text-[var(--color-300)]">
                                Miembros: {membersCount[group.id] ?? "Cargando..."}
                            </span>
                            <button className="text-sm text-[var(--color-600)] dark:text-[var(--color-100)] hover:text-[var(--color-700)] dark:hover:text-[var(--color-200)] underline">
                                Ver detalles
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mensaje si no hay grupos */}
            {groups.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>No tienes grupos creados aún.</p>
                    <p>
                        Haz clic en{" "}
                        <span className="font-semibold">+ Nuevo wepayit</span> para
                        crear uno.
                    </p>
                </div>
            )}
        </div>
    );
};
