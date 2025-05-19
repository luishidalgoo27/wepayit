import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useLoaderData } from "react-router-dom";
import { getMessageCuñao } from "@/utils/notification";
import { useState } from "react";

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { users } = useGetUsers(id);
    const { divisions } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);

    const [filter, setFilter] = useState("pending");

    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));
    const expensesMap = Object.fromEntries(expenses.map((e) => [e.id, e]));

    const filteredDivisions = divisions.filter((d) => d.status === filter);

    return (
        <div className="space-y-4">
            <p className="text-center">{getMessageCuñao()}</p>

            <select
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 shadow border"
            >
                <option value="pending">Pendientes</option>
                <option value="paid">Pagadas</option>
            </select>

            {divisions.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>No hay deudas pendientes en este grupo.</p>
                </div>
            )}

            {filteredDivisions.map((d, i) => {
                const user = usersMap[d.user_id];
                const expense = expensesMap[d.expense_id];
                const pagador = expense ? usersMap[expense.paid_by] : null;

                if (!user || !expense || !pagador) return null;

                return (
                    <div
                        key={i}
                        className="box dark:text-50 shadow-sm px-4 py-3 bg-white dark:bg-zinc-800 rounded-xl"
                    >
                        {d.status === "pending" ? (
                            <p>
                                <span className="font-semibold">{user.name}</span> debe{" "}
                                <span className="font-semibold">
                                    {d.assigned_amount.toFixed(2)}€ 💸
                                </span>{" "}
                                a <span className="font-semibold">{pagador.name}</span> por{" "}
                                <span className="italic">"{expense.title}"</span>
                            </p>
                        ) : (
                            <p>
                                <span className="font-semibold">{user.name}</span> pagó{" "}
                                <span className="font-semibold">
                                    {d.assigned_amount.toFixed(2)}€ ✅
                                </span>{" "}
                                a <span className="font-semibold">{pagador.name}</span> por{" "}
                                <span className="italic">"{expense.title}"</span>
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
