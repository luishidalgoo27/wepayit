import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useLoaderData } from "react-router-dom";
import { getMessageCuñao } from "@/utils/notification";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string };

    const { users } = useGetUsers(id);
    const { divisions } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);

    const paidMap: Record<number, number> = {};
    const consumedMap: Record<number, number> = {};

    if (divisions && expenses) {
        const pendientes = divisions.filter(d => d.status === 'pending');

        for (const division of pendientes) {
            const userId = division.user_id;
            const assigned = division.assigned_amount;

            const expense = expenses.find(e => e.id === division.expense_id);
            if (!expense) continue;

            const payerId = expense.paid_by;

            consumedMap[userId] = (consumedMap[userId] || 0) + assigned;
            paidMap[payerId] = (paidMap[payerId] || 0) + assigned;
        }
    }

    const balances = users.map(user => {
        const paid = paidMap[user.id] || 0;
        const consumed = consumedMap[user.id] || 0;
        const balance = paid - consumed;

        return {
            ...user,
            paid,
            consumed,
            balance,
        };
    });

    const chartData = {
        labels: balances.map(user => user.name),
        datasets: [
            {
                label: "Balance",
                data: balances.map(user => user.balance),
                backgroundColor: balances.map(user =>
                    user.balance > 0 ? "#4ade80" : user.balance < 0 ? "#f87171" : "#9ca3af"
                ),
                barThickness: 18,
                borderRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.raw.toFixed(2)} €`
                }
            }
        },
        scales: {
            y: {
                ticks: { display: false },
                grid: { display: false }
            },
            x: {
                ticks: { color: "#6b7280" },
                grid: { display: false }
            }
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-center">{getMessageCuñao()}</p>

            {/* Lista de deudas */}
            {balances.map(user => (
                user.balance < 0 && (
                    <div
                        key={user.id}
                        className="box dark:text-50 shadow-sm px-4 py-3"
                    >
                        <p className="font-semibold">
                            {user.username}
                        </p>
                        <p className="dark:text-200">
                            Debe {(user.balance * -1).toFixed(2)}€
                        </p>
                    </div>
                )
            ))}

            {/* Si nadie debe nada */}
            {balances.every(user => user.balance >= 0) && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>Nadie tiene deudas pendientes en este grupo.</p>
                </div>
            )}
        </div>
    );
};
