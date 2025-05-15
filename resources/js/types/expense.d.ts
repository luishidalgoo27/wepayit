/* GET */
export interface Expense {
    id: number
    title: string
    amount: number
    currency_type: string
    paid_by: number
    group_id: string
    date: string
    description: string
    category_id: number
    receipt_url: string
    state: string
}

/* OTHERS RELATIONS */
export interface ExpenseDivision {
    id: number
    expense_id: number
    user_id: number
    assigned_amount: number
    status: string
}

export interface Payment {
    id: number,
    expense_id: number
    payer_id: number
    amount: number
    payment_date: string
    status: string
}

/* CREATE, EDIT AND DELETE */
export type CreateExpense = {
    title: string
    amount: number
    currency_type: string
    date: string
    description: string
    category_id: number
    receipt_url: string
    group_id: string
    users_division: UserDivision[]
}

export interface Category {
    id: number
    type: string
}

export interface UserDivision { 
    user_id: number
    assigned_amount: number
    selected: boolean 
}

