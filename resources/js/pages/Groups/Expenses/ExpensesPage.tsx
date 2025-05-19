import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";
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
    <>
      {/* Botón para añadir gasto */}
      <div
        onClick={() => navigate(`/groups/${id}/create-expense`)}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/groups/${id}/create-expense`)}
        role="button"
        tabIndex={0}
        className="clickButton block w-full text-center bg-gradient-to-b font-semibold py-3 shadow-md cursor-pointer rounded-full"
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
            <Link
              key={expense.id}
              to={`/groups/${id}/expenses/${expense.id}`}
              className="box p-4 shadow-md flex flex-col gap-2 transition hover:bg-[var(--color-50)] dark:hover:bg-[var(--color-800)] rounded-xl"
            >
              {/* Izquierda: Emoji circular + Info */}
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-white shadow flex items-center justify-center text-2xl bg-white dark:bg-[var(--color-700)]">
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
                    className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                      expense.state === "pending"
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
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
