import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getGroup } from "@/services/groups"
import { Group } from "@/types/group"

export const useGetGroup = (id:string) => {
    const [group, setGroup] = useState<Group>({} as Group)

    const fetchGroup = async () => {
        try{
            const data = await getGroup(id)
            setGroup(data)
        } catch(error: any) {
            toast.error('Error al obtener el grupo')
            console.error(error)
        }
    }

    useEffect(() => {
        fetchGroup()
    }, [])
    
    return { group }
}