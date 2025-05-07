export interface Expense {
    id: number,
    title: string, 
    amount: number,
    currency_type: string,
    date: Date,
    description: Text,
    category: string,
    receipt_url: string
}

export interface ExpenseDivision {
    id: number,
    expense_id: number, 
    user_id: number,
    assigned_amount: number,
    status: boolean
}