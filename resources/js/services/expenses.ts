import api from "@/utils/api"
import { API_URL } from "@/config"
import { Category, CreateExpense, Expense, ExpenseDivision, UpdateExpense } from "@/types/expense"

export const getExpenses = async (id: string):Promise<Expense[]> => {
    const res = await api.post(`${API_URL}/expenses`, {
        group_id: id
    })
    return res.data
}

export const getExpense = async (id: string):Promise<Expense> => {
    const res = await api.post(`${API_URL}/get-expense`, {
        expense_id: id
    })
    return res.data
}

export const createExpense = async (expense: CreateExpense): Promise<Expense> => {
    const res = await api.post(`${API_URL}/expense`, expense);
    return res.data;
};

export const updateExpense = async (expense: UpdateExpense): Promise<Expense> => {
    const res = await api.put(`${API_URL}/expense`, expense);
    return res.data;
};

export const deleteExpense = async (expense_id: string): Promise<Expense> => {
    const res = await api.post(`${API_URL}/delete-expense`, {
        expense_id: expense_id
    });
    return res.data;
};

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

export const getExpensesDivisionsByExpense = async (expense_id: string):Promise<ExpenseDivision[]> => {
    const res = await api.post(`${API_URL}/divisionsExp`, {
        expense_id: expense_id
    })
    return res.data
}

export const totalUserExpenses = async (id: string): Promise<number> => {
    const res = await api.post(`${API_URL}/payments`, {
        group_id: id
    });
    return res.data;
};

export const totalGroupExpenses = async (id: string): Promise<number> => {
    const res = await api.post(`${API_URL}/paymentGroup`, {
        group_id: id
    });
    return res.data;
};

export const markAsPaid = async (division_id: number): Promise<number> => {
    const res = await api.post(`${API_URL}/markPaidDiv`, {
        division_id
    });
    return res.data;
};

export const markAllAsPaid = async (expense_id: string): Promise<number> => {
    const res = await api.post(`${API_URL}/markPaidExp`, {
        expense_id
    });
    return res.data;
};

export const notifyPayment = async (group_id: string, guest_email: string, expense_id: string): Promise<number> => {
    const res = await api.post(`${API_URL}/notification`, {
        group_id,
        guest_email,
        expense_id
    });
    return res.data;
};

export const convertToCurrency = async (amount: number, from: string, to: string): Promise<number> => {
    const res = await api.post(`${API_URL}/converter`, {
        amount,
        from,
        to
    });
    return res.data;
}