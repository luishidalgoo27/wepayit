import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { ExpenseDivision } from "@/types/expense";
import { getExpensesDivisions } from "@/services/expenses";

export const useGetDivisions = (id: string) => {
    const [divisions, setDivisions] = useState<ExpenseDivision[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"pending" | "paid" | "all">("pending");

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

    const filteredDivisions = useMemo(() => {
        return divisions.filter(d => {
            if (filter === "all") return true;
            return d.status === filter;
        });
    }, [divisions, filter]);

    useEffect(() => {
        fetchDivisions();
    }, [fetchDivisions]);

    return { 
        divisions: filteredDivisions, 
        loading, 
        refetch: fetchDivisions,
        filter,
        setFilter
    };
};
