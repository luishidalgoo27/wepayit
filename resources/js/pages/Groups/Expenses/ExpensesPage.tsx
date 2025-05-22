import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { PlusCircle, Filter } from "lucide-react";
import { useEffect, useMemo } from "react";

export const ExpensesPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { expenses, setFilter, filter } = useGetExpenses(id);
  const navigate = useNavigate();

  const categoryIcons: Record<number, string> = {
    1: "🍽️", 2: "🛒", 3: "🏠", 4: "🚌", 5: "✈️",
    6: "🎮", 7: "🎬", 8: "🛍️", 9: "🎁", 10: "💊",
    11: "🎓", 12: "💡", 13: "📱", 14: "🐶", 15: "📅",
    16: "🎉", 17: "🧹", 18: "🛠️", 19: "💰", 20: "❓"
  };

  // Calcular totales
  const { totalAmount, currency } = useMemo(() => {
    if (!expenses || expenses.length === 0) return { totalAmount: 0, currency: '€' };
    
    const total = expenses.reduce((sum, expense) => {
      return sum + parseFloat(expense.amount.toString());
    }, 0);
    
    // Usamos la moneda del primer gasto o € por defecto
    const mainCurrency = expenses[0]?.currency_type || '€';
    
    return { 
      totalAmount: total.toFixed(2), 
      currency: mainCurrency 
    };
  }, [expenses]);

  if (!expenses) return <p className="text-center text-gray-500 mt-6">Cargando gastos...</p>;

  return (
    <div className="py-2">
      {/* Filtros y totales */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[var(--color-800)] text-gray-800 dark:text-white shadow border border-gray-300 dark:border-[var(--color-700)] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-400)] transition w-full sm:w-auto"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="closed">Pagados</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[var(--color-800)] rounded-xl shadow-md p-4 w-full sm:w-auto">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total gastos:</p>
          <p className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-200)]">
            {totalAmount} <span className="text-sm text-gray-500">{currency}</span>
          </p>
        </div>
      </div>

      {/* Botón para añadir gasto */}
      <div
        onClick={() => navigate(`/groups/${id}/create-expense`)}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/groups/${id}/create-expense`)}
        role="button"
        tabIndex={0}
        className="mb-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-500)] to-[var(--color-700)] text-white font-semibold py-3 px-6 shadow-lg cursor-pointer rounded-full text-lg transition hover:scale-105 hover:shadow-xl"
      >
        <PlusCircle className="w-6 h-6" /> Añadir gasto
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {expenses.map((expense) => (
            <Link
              key={expense.id}
              to={`/groups/${id}/expenses/${expense.id}`}
              className="group bg-white dark:bg-[var(--color-800)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col justify-between p-5 border border-transparent hover:border-[var(--color-400)]"
            >
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white shadow flex items-center justify-center text-3xl bg-white dark:bg-[var(--color-700)]">
                  {expense.category_id
                    ? categoryIcons[expense.category_id]
                    : (
                        <img
                          src="https://res.cloudinary.com/dotw4uex6/image/upload/v1747049502/ChatGPT_Image_12_may_2025_13_31_33_lc1quj.png"
                          alt="Avatar del usuario"
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-[var(--color-950)] dark:text-white truncate">
                    {expense.title}
                  </p>
                  <p className="text-xs text-[var(--color-600)] dark:text-[var(--color-400)]">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                  {expense.description && (
                    <p className="text-xs text-[var(--color-500)] dark:text-[var(--color-300)] mt-1 truncate">
                      {expense.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  {expense.state && (
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                        expense.state === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {expense.state === "pending" ? "Pendiente" : "Pagado"}
                    </span>
                  )}
                  {expense.receipt_url && (
                    <a
                      href={expense.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-blue-500 hover:underline mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver recibo
                    </a>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[var(--color-700)] dark:text-[var(--color-100)]">
                    {expense.amount} {expense.currency_type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};