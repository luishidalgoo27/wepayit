import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getGroup } from "@/services/groups"
import { Group } from "@/types/group"
import { Expense } from "@/types/expense"
import { getExpense } from "@/services/expenses"

export const useGetExpense = (id:string) => {
    const [expense, setExpense] = useState<Expense>({} as Expense)
    const [loading, setLoading] = useState(true);

    const fetchExpense = async () => {
        try{
            const data = await getExpense(id)
            setExpense(data)
        } catch(error: any) {
            toast.error('Error al obtener el gasto')
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExpense()
    }, [])
    
    return { expense, loading }
}