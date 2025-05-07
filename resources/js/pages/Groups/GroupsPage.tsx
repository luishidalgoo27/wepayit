import { getGroups } from "@/services/groups"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Group } from "@/types/group"

export const GroupsPage = () => {
    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        const loadGroups = async() => {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                toast.error("Error al cargar los grupos");
                console.error(error);
            }
        }

        loadGroups()
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#00110F] to-[#164236] flex justify-center py-10   mx-auto p-4">
            <div className="w-11/12 max-w-md space-y-4">
                {
                    groups.map((group, index) => (
                        <Link key={index} to={`/groups/${group.id}/expenses`} className="bg-[#D5F3EA] text-black rounded-xl flex  p-4 w-xl  shadow-md">
                            <div>
                                <h2 className="font-semibold">{group.name}</h2>
                                <p className="text-sm">{group.description}</p>
                            </div>
                        </Link>
                    ))
                }

                <Link to="/groups/create-group" className="block text-center bg-[#D5F3EA] text-black hover:bg-[#b9e6d8] rounded-xl py-3 mt-2 w-xl  shadow-md font-semibold transition">
                    + Crear nuevo grupo
                </Link>
            </div>
        </main>
    )
}
