import { ArrowLeft, CheckCircle, Bell } from "lucide-react";

export const ExpenseDetallesPage = () => {
    return (
        <div className="max-w-2xl mx-auto box shadow-xl p-8 mt-8 relative">
            <div className="pl-10">
                <h2 className="text-3xl font-bold mb-2 text-[var(--color-950)] dark:text-white">Cocacola</h2>
                <div className="text-xl font-semibold mb-1 text-[var(--color-700)] dark:text-[var(--color-200)]">27/03/2025</div>
                <div className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-200)]">2 USD</div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-[var(--color-500)] dark:text-[var(--color-200)]">1 EUR</span>
                </div>
                <button
                    className="absolute right-8 top-8 px-4 py-2 rounded-xl font-semibold shadow clickButton"
                >
                    Marcar todo como pagado
                </button>
            </div>

            <div className="mt-10 space-y-6">
                <div className="box p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow">
                    <div className="font-medium text-lg text-[var(--color-950)] dark:text-white">Luis Hidalgo debe 3€</div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 transition"
                        >
                            <Bell size={16} /> Notificar
                        </button>
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold clickButton"
                        >
                            <CheckCircle size={16} /> Marcar como pagado
                        </button>
                    </div>
                </div>
                <div className="box p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow">
                    <div className="font-medium text-lg text-[var(--color-950)] dark:text-white">Luis Hidalgo debe 5€</div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 transition"
                        >
                            <Bell size={16} /> Notificar
                        </button>
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold clickButton"
                        >
                            <CheckCircle size={16} /> Marcar como pagado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};