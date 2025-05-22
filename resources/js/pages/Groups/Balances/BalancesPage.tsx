import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useLoaderData } from "react-router-dom";
import { getMessageCuñao } from "@/utils/notification";
import { useMemo, useState } from "react";
import { CheckCircle, Clock, Filter } from "lucide-react";

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { users } = useGetUsers(id);
    const { divisions, filter, setFilter, loading } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);

    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));
    const expensesMap = Object.fromEntries(expenses.map((e) => [e.id, e]));

    // Calcular totales
    const { totalAmount, currency } = useMemo(() => {
        if (!divisions || divisions.length === 0) return { totalAmount: 0, currency: '€' };
        
        const total = divisions.reduce((sum, division) => {
            return sum + (typeof division.assigned_amount === 'number' 
                ? division.assigned_amount 
                : parseFloat(division.assigned_amount || '0'));
        }, 0);
        
        // Usamos la moneda del primer gasto o € por defecto
        const firstExpense = expenses.find(e => e.id === divisions[0]?.expense_id);
        const mainCurrency = firstExpense?.currency_type || '€';
        
        return { 
            totalAmount: total.toFixed(2), 
            currency: mainCurrency 
        };
    }, [divisions, expenses]);

    if (loading) return <p className="text-center text-gray-500 mt-6">Cargando deudas...</p>;

    return (
        <div className="py-2">
            {/* Filtros y totales */}
            <div className="flex flex-col sm:flex-row justify-between items-start  gap-4 mb-3">
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as "pending" | "paid" | "all")}
                            className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[var(--color-800)] text-gray-800 dark:text-white shadow border border-gray-300 dark:border-[var(--color-700)] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-400)] transition w-full sm:w-auto"
                        >
                            <option value="all">Todas</option>
                            <option value="pending">Pendientes</option>
                            <option value="paid">Pagadas</option>
                        </select>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-[var(--color-800)] rounded-xl shadow-md p-2 w-full sm:w-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total {filter === 'paid' ? 'pagado' : 'pendiente'}:</p>
                    <p className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-200)]">
                        {totalAmount} <span className="text-sm text-gray-500">{currency}</span>
                    </p>
                </div>
            </div>

            {divisions.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    <p>No hay deudas pendientes en este grupo.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {divisions.map((d, i) => {
                        const user = usersMap[d.user_id];
                        const expense = expensesMap[d.expense_id];
                        const pagador = expense ? usersMap[expense.paid_by] : null;

                        if (!user || !expense || !pagador) return null;

                        const amount = typeof d.assigned_amount === 'number' 
                            ? d.assigned_amount.toFixed(2) 
                            : parseFloat(d.assigned_amount || '0').toFixed(2);

                        return (
                            <div
                                key={i}
                                className={`group bg-white dark:bg-[var(--color-800)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-5 border border-transparent hover:border-[var(--color-400)]`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                        d.status === "pending" 
                                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40" 
                                            : "bg-green-100 text-green-600 dark:bg-green-900/40"
                                    }`}>
                                        {d.status === "pending" ? (
                                            <Clock className="w-6 h-6" />
                                        ) : (
                                            <CheckCircle className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-medium text-gray-900 dark:text-white">
                                            {d.status === "pending" ? (
                                                <>
                                                    <span className="font-semibold">{user.name}</span> debe <span className="font-semibold">{amount} {currency}</span> a <span className="font-semibold">{pagador.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="font-semibold">{user.name}</span> pagó <span className="font-semibold">{amount} {currency}</span> a <span className="font-semibold">{pagador.name}</span>
                                                </>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {expense.title}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-lg font-bold ${
                                            d.status === "pending" 
                                                ? "text-yellow-600 dark:text-yellow-400" 
                                                : "text-green-600 dark:text-green-400"
                                        }`}>
                                            {amount} <span className="text-sm text-gray-500">{currency}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};