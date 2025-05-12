import api from "@/utils/api"
import { API_URL } from "@/config"
import { Category, CreateExpense, Expense, ExpenseDivision } from "@/types/expense"

export const getExpenses = async (id: string):Promise<Expense[]> => {
    const res = await api.post(`${API_URL}/expenses`, {
        group_id: id
    })
    return res.data
}

export const getCategories = async ():Promise<Category[]> => {
    const res = await api.get(`${API_URL}/categories`)
    return res.data
}

export const getExpensesDivisions = async (id: string):Promise<ExpenseDivision[]> => {
    const res = await api.post(`${API_URL}/divisions`, {
        group_id: id
    })
    return res.data
}

export const createExpense = async (expense: CreateExpense): Promise<Expense> => {
    const res = await api.post(`${API_URL}/expense`, expense);
    return res.data;
};