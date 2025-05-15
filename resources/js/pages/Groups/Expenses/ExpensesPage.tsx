import { Link, useLoaderData } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { expenses } = useGetExpenses(id);

    return (
        <>
            {/* Boton añadir gasto */}
            <Link
                to={`/groups/${id}/create-expense`}
                className="clickButton block w-full text-center bg-gradient-to-b font-semibold py-3 shadow-md"
            >
                + Añadir gasto
            </Link>
            {/* Lista de gastos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="box shadow-sm px-4 py-3 flex items-start justify-between"
                    >
                        {/* Izquierda: Título, categoría y fecha */}
                        <div className="space-y-1">
                            <p className="font-medium dark:text-50 text-950 leading-tight">{expense.title} <span className="text-sm dark:text-300 text-500">{new Date(expense.date).toLocaleDateString()}</span></p>
                            <p className="text-sm dark:text-300 text-800">{expense.category}</p>
                        </div>

                        {/* Derecha: Monto, estado, recibo */}
                        <div className="text-right space-y-1">
                            <p className="text-lg font-semibold dark:text-200 text-700">
                                {expense.amount} {expense.currency_type}
                            </p>

                            {expense.state && (
                                <span
                                    className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${expense.state === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-500 text-200"
                                        }`}
                                >
                                    {expense.state}
                                </span>
                            )}

                            {expense.receipt_url && (
                                <Link
                                    to={expense.receipt_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-xs text-blue-500 hover:underline"
                                >
                                    Recibo
                                </Link>
                            )}
                        </div>

                        {/* Botón ver gasto */}
                        <Link
                            to={`/groups/${id}/edit-expenses`}
                            className="bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950  w-auto p-5 text-center  font-semibold py-3 rounded-xl shadow-md"
                        >
                            Ver gasto
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};
