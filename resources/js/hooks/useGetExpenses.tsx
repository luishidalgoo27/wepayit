import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Expense } from "@/types/expense"
import { getExpenses } from "@/services/expenses"

export const useGetExpenses = (id: string) => {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [filter, setFilter] = useState<string>("all");

    const fetchExpenses = async() => {
        try {
            const data = await getExpenses(id);
            setExpenses(data);
        } catch (error) {
            toast.error("Error al cargar los gastos");
            console.error(error);
        }
    }

    const filteredExpenses = expenses.filter(expense => {
        if (filter === "all") return true;
        return expense.state === filter;
    });

    useEffect(() => {
        fetchExpenses()
    }, [id])

    return { 
        expenses: filteredExpenses, 
        setFilter,
        filter
    }
}