import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Expense } from "@/types/expense"
import { getExpenses } from "@/services/expenses"

export const useGetExpenses = (id:string) => {
    const [expenses, setExpenses] = useState<Expense[]>([])

    const fetchExpenses = async() => {
        try {
            const data = await getExpenses(id);
            setExpenses(data);
        } catch (error) {
            toast.error("Error al cargar los gastos");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return { expenses }
}