import { Link, useLoaderData } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { expenses } = useGetExpenses(id);

    const categoryIcons: Record<number, string> = {
        1: "🍽️", 2: "🛒", 3: "🏠", 4: "🚌", 5: "✈️",
        6: "🎮", 7: "🎬", 8: "🛍️", 9: "🎁", 10: "💊",
        11: "🎓", 12: "💡", 13: "📱", 14: "🐶", 15: "📅",
        16: "🎉", 17: "🧹", 18: "🛠️", 19: "💰", 20: "❓"
    };

    return (
        <>
            {/* Botón para añadir gasto */}
            <Link
                to={`/groups/${id}/create-expense`}
                className="clickButton block w-full text-center bg-gradient-to-b font-semibold py-3 shadow-md"
            >
                + Añadir gasto
            </Link>

            {/* Lista de gastos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {expenses.map((expense) => (
                    <Link
                        to={`/groups/${id}/edit-expense/${expense.id}`}
                        key={expense.id}
                        className="box bg-[var(--color-50)] dark:bg-[var(--color-800)] p-4 rounded shadow flex justify-between gap-4 items-center hover:shadow-md transition"
                    >
                        {/* Izquierda: Emoji circular + Info */}
                        <div className="flex gap-4 items-start">
                            {expense.category_id ? (
                                <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-white shadow flex items-center justify-center text-2xl bg-white dark:bg-[var(--color-700)]">
                                    {categoryIcons[expense.category_id]}
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-full flex items-center justify-center">
                                    <img
                                        src="https://res.cloudinary.com/dotw4uex6/image/upload/v1747049502/ChatGPT_Image_12_may_2025_13_31_33_lc1quj.png"
                                        className="rounded-full object-cover border-4 border-white shadow"
                                        alt="Avatar del usuario"
                                    />
                                </div>
                            )}

                            <div>
                                <p className="font-semibold text-[var(--color-950)] dark:text-white leading-snug">
                                    {expense.title}
                                </p>
                                <p className="text-xs text-[var(--color-600)] dark:text-[var(--color-400)]">
                                    {new Date(expense.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Derecha: Monto, estado, recibo */}
                        <div className="text-right space-y-1">
                            <p className="text-lg font-semibold text-[var(--color-700)] dark:text-[var(--color-200)]">
                                {expense.amount} {expense.currency_type}
                            </p>

                            {expense.state && (
                                <span
                                    className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${expense.state === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-[var(--color-500)] text-white"
                                        }`}
                                >
                                    {expense.state}
                                </span>
                            )}

                            {expense.receipt_url && (
                                <a
                                    href={expense.receipt_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-xs text-blue-500 hover:underline"
                                >
                                    Ver recibo
                                </a>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
