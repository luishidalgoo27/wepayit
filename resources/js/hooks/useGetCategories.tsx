import { getCategories } from "@/services/expenses";
import { Category } from "@/types/expense";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            toast.error("Error al obtener las categorías");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, refetch: fetchCategories };
};
