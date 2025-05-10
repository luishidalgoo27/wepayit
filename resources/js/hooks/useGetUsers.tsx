import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUsersByGroup } from "@/services/user";
import { User } from "@/types/user";

export const useGetUsers = (id: string) => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try{
            const data = await getUsersByGroup(id)
            setUsers(data)
        } catch(error: any) {
            toast.error('Error al obtener los usuarios')
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return { users }
}