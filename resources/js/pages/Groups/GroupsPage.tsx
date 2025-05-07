import { getGroups } from "@/services/groups"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Group } from "@/types/group"

export const GroupsPage = () => {
    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                toast.error("Error al cargar los grupos");
                console.error(error);
            }
        }

        loadGroups();
    }, [])

    return (
        <div className="container max-w-4xl mx-auto py-8 space-y-6"> {/* La propiedad max-w-4xl define el tamaño del witdh */}
            <h1 className="text-center text-3xl font-bold  mb-4">Tus grupos</h1>

            <div className="grid gap-4 sm:grid-cols-2">
                {groups.map((group) => (
                    <Link
                        key={group.id}
                        to={`/groups/${group.id}/expenses`}
                        className="bg-white hover:bg-gray-100 transition border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-1"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">{group.name}</h2>
                        <p className="text-sm text-gray-500">{group.description || "Sin descripción"}</p>
                    </Link>
                ))}
            </div>

            <Link
                to="/groups/create-group"
                className="block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md"
            >
                + Crear nuevo grupo
            </Link>
        </div>
    )
}
