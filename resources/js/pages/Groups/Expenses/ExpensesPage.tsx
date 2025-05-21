import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";

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

  if (!expenses) return <p className="text-center text-gray-500 mt-6">Cargando gastos...</p>;

  return (
    <div className="py-2">
      {/* Botón para añadir gasto */}
      <div
        onClick={() => navigate(`/groups/${id}/create-expense`)}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/groups/${id}/create-expense`)}
        role="button"
        tabIndex={0}
        className="mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-500)] to-[var(--color-700)] text-white font-semibold py-3 px-6 shadow-lg cursor-pointer rounded-full text-lg transition hover:scale-105 hover:shadow-xl"
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
                          ? "bg-yellow-100 text-yellow-700"
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