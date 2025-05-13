import { getCategories } from "@/services/expenses"
import { Category } from "@/types/expense"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try{
            const data = await getCategories()
            setCategories(data)
        } catch(error: any) {
            toast.error('Error al obtener las categorias')
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return { categories, loading }
}