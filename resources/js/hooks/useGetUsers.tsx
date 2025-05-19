import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getUsersByGroup } from "@/services/user";
import { User } from "@/types/user";

export const useGetUsers = (id: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUsersByGroup(id);
            setUsers(data);
        } catch (error) {
            toast.error("Error al cargar usuarios");
            console.error("Error al cargar usuarios", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        refetch: fetchUsers,
    };
};
