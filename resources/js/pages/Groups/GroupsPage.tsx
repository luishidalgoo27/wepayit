import { getUserCount } from "@/services/groups";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetGroups } from "@/hooks/useGetGroups";

export const GroupsPage = () => {
    const { groups } = useGetGroups();
    const [membersCount, setMembersCount] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchCounts = async () => {
            const newCounts: { [key: string]: number } = {};

            for (const group of groups) {
                const count = await getUserCount(group.id);
                newCounts[group.id] = count;
            }

            setMembersCount(newCounts);
        };

        if (groups.length > 0) {
            fetchCounts();
        }
    }, [groups]);

    return (
        <div className="container max-w-6xl mx-auto px-2 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Panel izquierdo: Ruleta */}
                <div className="hidden lg:flex flex-col justify-center items-center w-80 bg-[var(--color-400)] text-900 dark:bg-[var(--color-800)] dark:text-50 rounded-2xl shadow-lg p-6 sticky top-24 self-start">
                    <img
                        src="/public/ruletaGroup.png"
                        alt="Ruleta"
                        className=" mb-4"
                    />
                    <h3 className="text-xl font-bold  mb-1">¿Quién paga?</h3>
                    <p className=" text-center text-sm">
                        Decide el pagador con una Ruleta divertida
                    </p>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 space-y-6 px-2">
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

                    {/* Grupos uno debajo del otro */}
                    <div className="flex flex-col gap-4">
                        {groups.map((group) => (
                            <Link
                                key={group.id}
                                to={`/groups/${group.id}/games`}
                                className="box p-4 shadow-md flex flex-col gap-2 transition"
                            >
                                <div className="flex items-center gap-4">
                                    {group.photo ? (
                                        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src={group.photo}
                                                className="w-full h-full rounded-full object-cover border-4 border-500 dark:border-600 shadow"
                                                alt="Avatar del grupo"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src="https://res.cloudinary.com/dotw4uex6/image/upload/v1747049502/ChatGPT_Image_12_may_2025_13_30_39_ook44q.png"
                                                className="w-full h-full rounded-full object-cover border-4 border-500 dark:border-600 shadow"
                                                alt="Avatar del grupo"
                                            />
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

                {/* Panel derecho: Trofeo */}
                <div className="hidden lg:flex flex-col justify-center items-center w-80 bg-[var(--color-400)] text-900 dark:bg-[var(--color-800)] dark:text-50 rounded-2xl shadow-lg p-6 sticky top-24 self-start">
                    <img
                        src="/public/trofeoGroup2.png"
                        alt="Trofeo"
                        className=" mb-4"
                    />
                    <h3 className="text-xl font-bold  mb-1">Retos del grupo</h3>
                    <p className=" text-center text-sm">
                        Completa desafíos divertidos con amigos
                    </p>
                </div>
            </div>
        </div>
    );
};