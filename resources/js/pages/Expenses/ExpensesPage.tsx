import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getExpenses } from "@/services/expenses";
import toast from "react-hot-toast";
import { Expense } from "@/types/expense";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
  }

export const ExpensesPage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const { id } = useLoaderData();

    useEffect(() => {
        const loadExpenses = async() => {
            try {
                const data = await getExpenses(id);
                setExpenses(data);
            } catch (error) {
                toast.error("Error al cargar los gastos");
                console.error(error);
            }
        }

        loadExpenses()
    }, [])
    
    return (  
        <div className="container max-w-4xl mx-auto py-8 space-y-6">
            {
                expenses.map((expense, index) => (
                    <div key={index} className="flex items-center bg-[#D5F3EA] rounded-xl p-4 shadow-md">
                        <div>
                            <p className="font-semibold">{expense.title}</p>
                            <p className="text-sm">{expense.amount}</p>
                        </div>
                    </div>
                ))
            }
            <button className="w-full bg-[#D5F3EA] text-center py-3 rounded-xl font-semibold hover:bg-[#b9e6d8] transition">
                + Añadir gasto
            </button>
        </div>  
    );
};
