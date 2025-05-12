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
            <h1 className="text-left text-5xl font-bold  mb-4">wepayit <span className="text-lg font-medium">by Medac</span></h1>

            <div className="grid gap-4 sm:grid-cols-2">
                {groups.map((group) => (
                    <Link
                        key={group.id}
                        to={`/groups/${group.id}`}
                        className="bg-white hover:bg-gray-100 hover:translate-y-0.5 transition border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-4">    
                            {    
                                group.photo 
                                ?   <img className="w-10 h-10 rounded-full" src={group.photo} alt="Rounded avatar"></img>
                                :   <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>
                            }
                            <h2 className="text-xl font-semibold text-gray-800">{group.name}</h2>
                        </div>
                        <p className="text-sm text-gray-500">{group.description || "Sin descripción"}</p>
                    </Link>
                ))}
            </div>

            <Link
                to="/groups/create-group"
                className="hover:translate-y-0.5 block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md"
            >
                + Nuevo wepayit
            </Link>
        </div>
    )
}
