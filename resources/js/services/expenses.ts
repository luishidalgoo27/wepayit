import api from "@/utils/api"
import { API_URL } from "@/config"
import { Expense } from "@/types/expense"

export const getExpenses = async (id: string):Promise<Expense[]> => {
    const res = await api.post(`${API_URL}/expenses`, {
        group_id: id
    })
    return res.data
}

export const createExpense = async (expense: Expense): Promise<Expense> => {
    const res = await api.post(`${API_URL}/expense`, expense);
    return res.data;
};