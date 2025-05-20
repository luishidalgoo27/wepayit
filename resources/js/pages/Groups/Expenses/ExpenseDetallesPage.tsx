import { useGetExpense } from "@/hooks/useGetExpense";
import { useGetUsers } from "@/hooks/useGetUsers";
import { ArrowLeft, CheckCircle, Bell, Pencil } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { markAllAsPaid, markAsPaid, notifyPayment } from "@/services/expenses";
import { useState } from "react";
import { useGetDivisionsByExpense } from "@/hooks/useGetDivisionsByExpense";

export const ExpenseDetallesPage = () => {
    const { idExp, id } = useParams<{ idExp: string; id: string }>();
    const { expense } = useGetExpense(idExp!);
    const { users } = useGetUsers(id!);
    const { divisions } = useGetDivisionsByExpense(idExp!);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (!expense) return <p className="text-center mt-10">Gasto no encontrado</p>;

    // Encuentra el usuario pagador
    const payer = users?.find(u => u.id === expense.paid_by);

    // Agrupa las deudas de los usuarios (excluyendo el pagador)
    const debts = divisions
        ?.filter(d => d.user_id !== expense.paid_by)
        .map(d => {
            const user = users?.find(u => u.id === d.user_id);
            return {
                ...d,
                user,
            };
        }) || [];

    // ¿Hay alguna deuda pendiente?
    const hasPending = debts.some(d => d.status === "pending");

    // Handlers
    const handleMarkAsPaid = async (divisionId: number) => {
        setLoading(true);
        await markAsPaid(divisionId);
        setLoading(false);
        navigate(0); // Refresca la página
    };

    const handleMarkAllAsPaid = async () => {
        setLoading(true);
        await markAllAsPaid(idExp!);
        setLoading(false);
        navigate(0);
    };

    const handleNotification = async (guest_email: string) => {
        setLoading(true);
        await notifyPayment(id!, guest_email, idExp!);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[75vh]">
            <div className="max-w-2xl mx-auto box shadow-xl p-8 mt-8 relative flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Link to={`/groups/${id}/expenses`} className="p-2 text-[var(--color-500)] hover:text-[var(--color-700)]">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="text-3xl font-bold text-[var(--color-950)] dark:text-white flex-1 text-center">{expense.title}</h2>
                    <Link to={`/groups/${id}/edit-expense/${idExp}`} className="p-2 text-[var(--color-500)] hover:text-[var(--color-700)]">
                        <Pencil />
                    </Link>
                </div>

                {/* Info */}
                <div className="pl-2 mb-4">
                    <div className="text-base text-[var(--color-700)] dark:text-[var(--color-200)] mb-1">
                        {expense.date}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[var(--color-700)] dark:text-[var(--color-200)]">
                            Pagado por
                        </span>
                        {payer && (
                            <span className="flex items-center gap-2">
                                <img
                                    src={payer.avatar || "https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png"}
                                    alt={payer.username}
                                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow"
                                />
                                <span className="font-bold">{payer.username}</span>
                            </span>
                        )}
                    </div>
                    <div className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-200)]">
                        {expense.amount} {expense.currency_type}
                    </div>
                    {expense.description && (
                        <div className="mt-2 text-[var(--color-600)] dark:text-[var(--color-300)] italic">
                            {expense.description}
                        </div>
                    )}
                    {hasPending && (
                        <button
                            className="absolute right-8 top-8 px-4 py-2 rounded-xl font-semibold shadow clickButton"
                            onClick={handleMarkAllAsPaid}
                            disabled={loading}
                        >
                            Marcar todo como pagado
                        </button>
                    )}
                </div>

                {/* Deudas */}
                <div className="mt-10 space-y-6">
                    {debts.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            No hay deudas en este gasto.
                        </div>
                    ) : (
                        debts.map((d) => (
                            <div
                                key={d.id}
                                className="box p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={d.user?.avatar || "https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png"}
                                        alt={d.user?.username}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                                    />
                                    <span className="font-medium text-lg text-[var(--color-950)] dark:text-white">
                                        {d.user?.username} debe {d.assigned_amount} {expense.currency_type} a {payer?.username}
                                    </span>
                                </div>
                                {d.status === "pending" && (
                                    <div className="flex gap-2">
                                        <button
                                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 transition"
                                            onClick={() => d.user?.email && handleNotification(d.user.email)}
                                            disabled={loading || !d.user?.email}
                                        >
                                            <Bell size={16} /> Notificar
                                        </button>
                                        <button
                                            className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold clickButton"
                                            onClick={() => handleMarkAsPaid(d.id)}
                                            disabled={loading}
                                        >
                                            <CheckCircle size={16} /> Marcar como pagado
                                        </button>
                                    </div>
                                )}
                                {d.status === "paid" && (
                                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold">
                                        Pagado
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};