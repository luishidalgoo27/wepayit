import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useLoaderData } from "react-router-dom";
import { getMessageCuñao } from "@/utils/notification";
import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { users } = useGetUsers(id);
    const { divisions } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);

    const [filter, setFilter] = useState("pending");

    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));
    const expensesMap = Object.fromEntries(expenses.map((e) => [e.id, e]));

    const filteredDivisions = divisions.filter((d) => {
        if (d.status !== filter) return false;
        if (
            filter === "paid" &&
            expensesMap[d.expense_id]?.paid_by === d.user_id
        ) {
            // No mostrar pagos a uno mismo en "Pagadas"
            return false;
        }
        return true;
    });

    return (
        <div className="py-2 space-y-6">
            <div className="flex mb-4">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    className="px-4 py-2 rounded-xl bg-500 dark:bg-500 text-950 dark:text-50 shadow border text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-400)] transition"
                >
                    <option value="pending">Pendientes</option>
                    <option value="paid">Pagadas</option>
                </select>
            </div>

            {divisions.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    <p>No hay deudas pendientes en este grupo.</p>
                </div>
            ) : filteredDivisions.length === 0 ? (
                <div className="text-center text-gray-400 dark:text-gray-500 mt-8">
                    <p>No hay movimientos en este filtro.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredDivisions.map((d, i) => {
                        const user = usersMap[d.user_id];
                        const expense = expensesMap[d.expense_id];
                        const pagador = expense ? usersMap[expense.paid_by] : null;

                        if (!user || !expense || !pagador) return null;

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl shadow-md border transition
                                    ${d.status === "pending"
                                        ? "bg-yellow-50 dark:bg-yellow-900/40 border-yellow-200 dark:border-yellow-800"
                                        : "bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800"
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    {d.status === "pending" ? (
                                        <Clock className="w-8 h-8 text-yellow-500" />
                                    ) : (
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {d.status === "pending" ? (
                                        <p className="text-base text-yellow-900 dark:text-yellow-100">
                                            <span className="font-semibold">{user.name}</span> debe{" "}
                                            <span className="font-semibold">
                                                {typeof d.assigned_amount === 'number' 
                                                    ? d.assigned_amount.toFixed(2)
                                                    : parseFloat(d.assigned_amount || '0').toFixed(2)}€ 💸
                                            </span>{" "}
                                            a <span className="font-semibold">{pagador.name}</span> por{" "}
                                            <span className="italic">"{expense.title}"</span>
                                        </p>
                                    ) : (
                                        <p className="text-base text-green-900 dark:text-green-100">
                                            <span className="font-semibold">{user.name}</span> pagó{" "}
                                            <span className="font-semibold">
                                                {typeof d.assigned_amount === 'number'
                                                    ? d.assigned_amount.toFixed(2)
                                                    : parseFloat(d.assigned_amount || '0').toFixed(2)}€ ✅
                                            </span>{" "}
                                            a <span className="font-semibold">{pagador.name}</span> por{" "}
                                            <span className="italic">"{expense.title}"</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};