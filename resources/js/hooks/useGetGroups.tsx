import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getGroups } from "@/services/groups"
import { Group } from "@/types/group"

export const useGetGroups = () => {
    const [groups, setGroups] = useState<Group[]>([])

    const fetchGroups = async () => {
        try{
            const data = await getGroups()
            setGroups(data)
        } catch(error: any) {
            toast.error('Error al obtener los grupos')
            console.error(error)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])
    
    return { groups }
}