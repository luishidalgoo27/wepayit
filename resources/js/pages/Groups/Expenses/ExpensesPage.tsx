import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { deleteExpense } from "@/services/expenses";

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string };
    const { expenses } = useGetExpenses(id);
    const navigate = useNavigate();

    const categoryIcons: Record<number, string> = {
        1: "🍽️", 2: "🛒", 3: "🏠", 4: "🚌", 5: "✈️",
        6: "🎮", 7: "🎬", 8: "🛍️", 9: "🎁", 10: "💊",
        11: "🎓", 12: "💡", 13: "📱", 14: "🐶", 15: "📅",
        16: "🎉", 17: "🧹", 18: "🛠️", 19: "💰", 20: "❓"
    };

    const handleExpenseClick = async (expenseId: string) => {
        const result = await Swal.fire({
            html: `
            <div class="flex flex-col items-center space-y-3 text-sm">
                <div class="text-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-800">¿Qué deseas hacer?</h2>
                    <p class="text-sm text-gray-500 mt-1">Elige una acción para este gasto</p>
                </div>

                <button 
                    id="btn-edit" 
                    class="w-56 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>Editar</span>
                </button>

                <button 
                    id="btn-complete" 
                    class="w-56 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Completar</span>
                </button>
            </div>
        `,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: false,
            customClass: {
                popup: 'rounded-xl p-6 shadow-md',
                cancelButton: 'rounded-full px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium'
            },
            didOpen: () => {
                const editBtn = document.getElementById('btn-edit');
                const completeBtn = document.getElementById('btn-complete');

                editBtn?.addEventListener('click', () => {
                    Swal.close();
                    navigate(`/groups/${id}/edit-expense/${expenseId}`);
                });

                completeBtn?.addEventListener('click', async () => {
                    Swal.close();
                    await deleteExpense(expenseId);
                    toast.success("Gasto marcado como completado");
                });
            }
        });
    };

    return (
        <>
            {/* Botón para añadir gasto */}
            <div
                onClick={() => navigate(`/groups/${id}/create-expense`)}
                className="clickButton block w-full text-center bg-gradient-to-b font-semibold py-3 shadow-md cursor-pointer"
            >
                + Añadir gasto
            </div>

            {/* Lista de gastos */}
            {expenses.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    <p>No hay gastos registrados en este grupo todavía.</p>
                    <p>
                        Haz clic en <span className="font-semibold">+ Añadir gasto</span> para crear el primero.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            onClick={() => handleExpenseClick(String(expense.id))}
                            className="box bg-[var(--color-50)] dark:bg-[var(--color-800)] p-4 rounded shadow flex justify-between gap-4 items-center hover:shadow-md transition cursor-pointer"
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
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Ver recibo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
