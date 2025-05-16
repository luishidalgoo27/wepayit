import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useLoaderData } from "react-router-dom";
import { getMessageCuñao } from "@/utils/notification";

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { users } = useGetUsers(id);
    const { divisions } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);

    // Indexamos users y expenses para acceso rápido
    const usersMap = Object.fromEntries(users.map(u => [u.id, u]));
    const expensesMap = Object.fromEntries(expenses.map(e => [e.id, e]));

    // Filtramos divisiones pendientes
    const pendientes = divisions.filter(d => d.status === "pending");

    // Solo mostramos deudas donde el usuario NO es el que ha pagado
    const deudas = pendientes.filter(d => {
        const expense = expensesMap[d.expense_id];
        const user = usersMap[d.user_id];
        return user && expense && user.id !== expense.paid_by;
    });

    return (
        <div className="space-y-4">
            <p className="text-center">{getMessageCuñao()}</p>

            {deudas.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>No hay deudas pendientes en este grupo.</p>
                </div>
            )}

            {deudas.map((d, i) => {
                const user = usersMap[d.user_id];
                const expense = expensesMap[d.expense_id];
                return (
                    <div
                        key={i}
                        className="box dark:text-50 shadow-sm px-4 py-3"
                    >
                        <p>
                            <span className="font-semibold">{user.username}</span> debe{" "}
                            <span className="font-semibold">{d.assigned_amount.toFixed(2)}€ 💸</span>{" "}
                            por <span className="italic">{expense.title}</span>
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
