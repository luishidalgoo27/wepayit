import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUsersByGroup } from "@/services/user";
import { User } from "@/types/user";

export const useGetUsers = (id: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsersByGroup(id);
                setUsers(data);
            } catch (error) {
                console.error("Error al cargar usuarios", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [id]);

    return { users, loading }
}