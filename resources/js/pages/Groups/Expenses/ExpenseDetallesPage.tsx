import { useGetExpense } from "@/hooks/useGetExpense";
import { useGetUser } from "@/hooks/useGetUser";
import { ArrowLeft, CheckCircle, Bell } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

export const ExpenseDetallesPage = () => {
    const { idExp } = useParams<{ idExp: string }>();
    const { id } = useParams<{ id: string }>();
    const { expense } = useGetExpense(idExp!);
 
    if (!expense) return <p>Gasto no encontrado</p>;

    return (
        <div className="max-w-2xl mx-auto box shadow-xl p-8 mt-8 relative flex justify-center flex-col">
            <div className="pl-10">
                <div className="flex">
                <h2 className="text-3xl font-bold mb-2 text-[var(--color-950)] dark:text-white">{expense.title}</h2>
                        <Link to={`/groups/${id}/edit-expense/${idExp}`} className="p-2">
                        <Pencil />
                        </Link>
                    </div>
                <div className="text-xl font-semibold mb-1 text-[var(--color-700)] dark:text-[var(--color-200)]">{expense.date}</div>
                <div className="text-xl font-semibold mb-1 text-[var(--color-700)] dark:text-[var(--color-200)]">Pagado por {expense.paid_by}</div>
                <div className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-200)]">{expense.amount} USD</div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-[var(--color-500)] dark:text-[var(--color-200)]">{ expense.amount } EUR</span>
                </div>
                <button className="absolute right-8 top-8 px-4 py-2 rounded-xl font-semibold shadow clickButton">
                    Marcar todo como pagado
                </button>
            </div>

            <div className="mt-10 space-y-6">
               <div className="box p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow">
                    <div className="font-medium text-lg text-[var(--color-950)] dark:text-white">Luis Hidalgo debe 3€ a expense.paid_by</div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 transition"
                        >
                            <Bell size={16} /> Notificar
                        </button>
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold clickButton"
                        >
                            <CheckCircle size={16} /> Marcar como pagado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
