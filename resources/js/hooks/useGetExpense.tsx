import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getExpense } from "@/services/expenses";
import { Expense } from "@/types/expense";

export const useGetExpense = (id: string) => {
    const [expense, setExpense] = useState<Expense>({} as Expense);
    const [loading, setLoading] = useState(true);

    const fetchExpense = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getExpense(id);
            setExpense(data);
        } catch (error) {
            toast.error("Error al obtener el gasto");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchExpense();
    }, [fetchExpense]);

    return { expense, loading, refetch: fetchExpense };
};
