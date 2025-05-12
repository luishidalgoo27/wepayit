import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { GroupHeader } from "@/components/ui/GroupHeader";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { expenses } = useGetExpenses(id);
    const { group } = useGetGroup(id);
    const { divisions } = useGetDivisions(id);
    const { user } = useGetUser();

    

    return (
        <>
            {/* Lista de gastos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 flex items-start justify-between"
                    >
                        {/* Izquierda: Título, categoría y fecha */}
                        <div className="space-y-1">
                            <p className="font-medium text-gray-800 leading-tight">{expense.title} <span className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</span></p>
                            <p className="text-sm text-gray-500">{expense.category}</p>
                        </div>

                        {/* Derecha: Monto, estado, recibo */}
                        <div className="text-right space-y-1">
                            <p className="text-lg font-semibold text-emerald-600">
                                {expense.amount} {expense.currency_type}
                            </p>

                            {expense.state && (
                                <span
                                    className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${expense.state === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
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
                    </div>
                ))}
            </div>


            {/* Boton añadir gasto */}
            <Link
                to={`/groups/${id}/expenses/create-expense`}
                className="hover:translate-y-0.5 block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md"
            >
                + Añadir gasto
            </Link>
        </>
    );
};
