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