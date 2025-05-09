export interface UserDivision {
    user_id: string;
    assigned_amount: number;
}

export interface Expense {
    title: string;
    amount: number;
    currency_type: string;
    date: string;
    description: string;
    category: string;
    receipt_url?: string;
    group_id: string;
    users_division: UserDivision[];
}


export interface ExpenseDivision {
    id: number,
    expense_id: number, 
    user_id: number,
    assigned_amount: number,
    status: boolean
}