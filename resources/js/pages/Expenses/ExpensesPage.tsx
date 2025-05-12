import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useGetGroup } from "@/hooks/useGetGroup";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { group } = useGetGroup(id);
    const { expenses } = useGetExpenses(id);

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-10 text-black">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-3">
                {group?.photo ? (
                    <img className="w-14 h-14 rounded-full shadow-md" src={group.photo} alt="Grupo" />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight">wepayit</h1>
                <p className="text-sm text-gray-600">{group?.name}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 bg-white border rounded-xl shadow-sm overflow-hidden text-center text-sm font-medium">
                <Link to={`/groups/${id}/expenses`} className="py-3 hover:bg-gray-100">
                    Gastos
                </Link>
                <Link to={`/groups/${id}/balances`} className="py-3 border-x hover:bg-gray-100">
                    Saldos
                </Link>
                <Link to={`/groups/${id}/photos`} className="py-3 hover:bg-gray-100">
                    Fotos
                </Link>
            </div>

            {/* Summary */}
            <div className="flex justify-around text-center">
                <div>
                    <p className="text-gray-500 text-sm">Mis gastos</p>
                    <p className="text-xl font-semibold">10 €</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Gastos totales</p>
                    <p className="text-xl font-semibold">20 €</p>
                </div>
            </div>

            {/* Expenses List */}
            <div className="grid grid-cols-2 space-x-4 space-y-4">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white p-4 rounded-xl shadow flex justify-between items-start border border-gray-100"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">{expense.title} <span className="text-sm text-gray-400"> - {new Date(expense.date).toLocaleDateString()}</span></h3>
                            <p className="text-sm text-gray-500 mb-1">{expense.category}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-lg font-bold text-emerald-600">
                                {expense.amount} {expense.currency_type}
                            </p>
                            {expense.state && (
                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-medium ${expense.state === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
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
                    </div>
                ))}
            </div>


            {/* Add Expense Button */}
            <Link
                to={`/groups/${id}/expenses/create-expense`}
                className="block w-full text-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:brightness-110 transition"
            >
                + Añadir gasto
            </Link>
        </div>
    );
};
