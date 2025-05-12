export interface Expense {
    id: number
    title: string
    amount: number
    currency_type: string
    date: string
    description: string
    category: string
    receipt_url: string
    state: string
    group_id: string
}

export type CreateExpense = {
    title: string
    amount: number
    currency_type: string
    date: string
    description: string
    category: string
    receipt_url: string
    group_id: string
    users_division: UserDivision[]
}

export interface UserDivision { 
    user_id: number
    assigned_amount: number
    selected: boolean 
}

export interface ExpenseDivision {
    id: number
    expense_id: number
    user_id: number
    assigned_amount: number
    status: boolean
}