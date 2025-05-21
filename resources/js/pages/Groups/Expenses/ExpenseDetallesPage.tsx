import { useGetExpense } from "@/hooks/useGetExpense";
import { useGetUsers } from "@/hooks/useGetUsers";
import { ArrowLeft, CheckCircle, Bell, Pencil } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { markAllAsPaid, markAsPaid, notifyPayment } from "@/services/expenses";
import { useEffect, useState } from "react";
import { markAllAsPaid, markAsPaid, notifyPayment, convertAmount } from "@/services/expenses";
import { useState, useEffect } from "react";
import { useGetDivisionsByExpense } from "@/hooks/useGetDivisionsByExpense";

export const ExpenseDetallesPage = () => {
    const { idExp, id } = useParams<{ idExp: string; id: string }>();
    const { expense } = useGetExpense(idExp!);
    const { users } = useGetUsers(id!);
    const { divisions } = useGetDivisionsByExpense(idExp!);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [convertedAmount, setConvertedAmount] = useState<{amount: number, currency: string} | null>(null);

    useEffect(() => {
        const fetchConvertedAmount = async () => {
            if (expense) {  
                try {
                    const result = await convertAmount(expense.id.toString());
                    setConvertedAmount({
                        amount: result.converted_amount,
                        currency: result.currency
                    });
                } catch (error) {
                    console.error('Error convirtiendo moneda:', error);
                }
            }
        };
    
        fetchConvertedAmount();
    }, [expense]);  

    if (!expense) return <p className="text-center mt-10">Gasto no encontrado</p>;

    const payer = users?.find(u => u.id === expense.paid_by);
    
    const debts = divisions
    ?.filter(d => d.user_id !== expense.paid_by)
    .map(d => {
        const user = users?.find(u => u.id === d.user_id);
        return { ...d, user };
    }) || [];
    
    // Todos los divisions pagados
    const allPaid = debts.length > 0 && debts.every(d => d.status === "paid");
    
    useEffect(() => {
        if (allPaid && expense.state !== "closed") {
            markAllAsPaid(idExp!)
        }
    }, [allPaid, expense.state, idExp, navigate]);
    
    const handleMarkAsPaid = async (divisionId: number) => {
        setLoading(true);
        await markAsPaid(divisionId);

        setLoading(false);
        navigate(-1)
    };

    const handleMarkAllAsPaid = async () => {
        setLoading(true);
        await markAllAsPaid(idExp!);

        divisions.map((d) => {
            if (d.expense_id === Number(idExp!)) {
                markAsPaid(d.id)
            }
        })

        setLoading(false);
        navigate(-1)
    };

    const handleNotification = async (guest_email: string) => {
        setLoading(true);
        await notifyPayment(id!, guest_email, idExp!);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[75vh]">
            <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[var(--color-800)] rounded-2xl shadow-xl p-8 mt-10 relative flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <Link to={`/groups/${id}/expenses`} className="p-2 text-[var(--color-500)] hover:text-[var(--color-700)]">
                        <ArrowLeft size={26} />
                    </Link>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-950)] dark:text-white flex-1 text-center">
                        {expense.title}
                    </h2>
                    <Link to={`/groups/${id}/edit-expense/${idExp}`} className="p-2 text-[var(--color-500)] hover:text-[var(--color-700)]">
                        <Pencil size={22} />
                    </Link>
                </div>

                {/* Info */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-2">
                    <div>
                        <div className="text-sm text-[var(--color-700)] dark:text-[var(--color-200)] mb-1">
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
                                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                                    />
                                    <span className="font-bold">{payer.username}</span>
                                </span>
                            )}
                        </div>
                        {expense.description && (
                            <div className="mt-1 text-[var(--color-600)] dark:text-[var(--color-300)] italic text-sm">
                                {expense.description}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-3xl font-bold text-[var(--color-700)] dark:text-[var(--color-100)]">
                            {expense.amount} {expense.currency_type}
                        </span>
                        <button
                            className="mt-2 px-4 py-2 rounded-xl font-semibold shadow bg-[var(--color-500)] hover:bg-[var(--color-700)] text-white transition"
                            onClick={handleMarkAllAsPaid}
                            disabled={loading || allPaid}
                        >
                            Marcar todo como pagado
                        </button>
                        {allPaid && (
                            <span className="mt-2 px-3 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold">
                                Gasto completado
                            </span>
                    <div className="flex flex-col items-end">
                        <div className="flex flex-col items-end">
                            <span className="text-3xl font-bold text-[var(--color-700)] dark:text-[var(--color-100)]">
                                {expense.amount} {expense.currency_type}
                            </span>
                            {convertedAmount && convertedAmount.currency !== expense.currency_type && (
                                <span className="text-sm text-[var(--color-500)] dark:text-[var(--color-400)] mt-1">
                                    ≈ {convertedAmount.amount.toFixed(2)} {convertedAmount.currency}
                                </span>
                            )}
                        </div>
                        {hasPending && (
                            <button
                                className="mt-2 px-4 py-2 rounded-xl font-semibold shadow bg-[var(--color-500)] hover:bg-[var(--color-700)] text-white transition"
                                onClick={handleMarkAllAsPaid}
                                disabled={loading}
                            >
                                Marcar todo como pagado
                            </button>
                        )}
                    </div>
                </div>

                {/* Deudas */}
                <div className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold text-[var(--color-700)] dark:text-[var(--color-200)] mb-2">
                        Participantes
                    </h3>
                    {debts.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            No hay deudas en este gasto.
                        </div>
                    ) : (
                        debts.map((d) => (
                            <div
                                key={d.id}
                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-[var(--color-100)] dark:bg-[var(--color-700)] rounded-xl p-4 shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={d.user?.avatar || "https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png"}
                                        alt={d.user?.username}
                                        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
                                    />
                                    <span className="font-medium text-base md:text-lg text-[var(--color-950)] dark:text-white">
                                        {d.user?.username} debe{" "}
                                        <span className="font-bold">{d.assigned_amount} {expense.currency_type}</span>{" "}
                                        a <span className="font-semibold">{payer?.username}</span>
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    {d.status === "pending" && (
                                        <>
                                            <button
                                                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 transition"
                                                onClick={() => d.user?.email && handleNotification(d.user.email)}
                                                disabled={loading || !d.user?.email}
                                            >
                                                <Bell size={16} /> Notificar
                                            </button>
                                            <button
                                                className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold bg-[var(--color-500)] hover:bg-[var(--color-700)] text-white transition"
                                                onClick={() => handleMarkAsPaid(d.id)}
                                                disabled={loading}
                                            >
                                                <CheckCircle size={16} /> Marcar como pagado
                                            </button>
                                        </>
                                    )}
                                    {d.status === "paid" && (
                                        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold">
                                            Pagado
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};