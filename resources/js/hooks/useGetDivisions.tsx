import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { ExpenseDivision } from "@/types/expense";
import { getExpensesDivisions } from "@/services/expenses";

export const useGetDivisions = (id: string) => {
    const [divisions, setDivisions] = useState<ExpenseDivision[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDivisions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getExpensesDivisions(id);
            setDivisions(data);
        } catch (error) {
            toast.error("Error al obtener las divisiones");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDivisions();
    }, [fetchDivisions]);

    return { divisions, loading, refetch: fetchDivisions };
};
