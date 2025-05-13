import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getGroup } from "@/services/groups"
import { Group } from "@/types/group"
import { ExpenseDivision } from "@/types/expense"
import { getExpensesDivisions } from "@/services/expenses"

export const useGetDivisions = (id:string) => {
    const [divisions, setDivisions] = useState<ExpenseDivision[]>()

    const fetchDivisions = async () => {
        try{
            const data = await getExpensesDivisions(id)
            setDivisions(data)
        } catch(error: any) {
            toast.error('Error al obtener las divisiones')
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDivisions()
    }, [])
    
    return { divisions }
}