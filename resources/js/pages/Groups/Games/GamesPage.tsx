import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetUserGroupExpenses } from "@/hooks/useGetUserGroupExpenses";
import { generateRandomExcuse } from "@/utils/excuse";

export const GamesPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { userExpense } = useGetUserGroupExpenses(id);
  const { users } = useGetUsers(id);

  const [funStats, setFunStats] = useState({
    coffeeEquivalent: 0,
    beerEquivalent: 0,
    kebabEquivalent: 0,
    movieTicketEquivalent: 0,
    daysToRecover: 0,
    gptEquivalent: 0,
  });

  const [excuse, setExcuse] = useState<string | null>(null);

  useEffect(() => {
    setFunStats({
      coffeeEquivalent: +(userExpense / 1.25).toFixed(1),
      beerEquivalent: +(userExpense / 3).toFixed(1),
      kebabEquivalent: +(userExpense / 4).toFixed(1),
      movieTicketEquivalent: +(userExpense / 10).toFixed(1),
      daysToRecover: +(userExpense / 5).toFixed(1),
      gptEquivalent: +(userExpense / 20).toFixed(1),
    });
  }, [userExpense]);

  const copyExcuseToClipboard = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse).then(() => {
        toast.success("Excusa copiada al portapapeles");
      });
    }
  };

  const handleChangeExcuse = async () => {
    try {
      const excuse = await generateRandomExcuse();
      setExcuse(excuse);
    } catch (error) {
      toast.error("Error al generar la excusa");
    }
  };

  const statsData = [
    { icon: "☕", label: "café", value: funStats.coffeeEquivalent },
    { icon: "🍻", label: "cervezas", value: funStats.beerEquivalent },
    { icon: "🥙", label: "kebabs", value: funStats.kebabEquivalent },
    { icon: "🎥", label: "entradas de cine", value: funStats.movieTicketEquivalent },
    { icon: "🤖", label: "meses de ChatGPT Plus", value: funStats.gptEquivalent },
    { icon: "💰", label: "días ahorrando 5€", value: funStats.daysToRecover },
  ];

  return (
    <div className="box-2 flex flex-col items-center gap-8 px-6 py-8">
      <h1 className="text-3xl font-bold text-[var(--color-400)] dark:text-[var(--color-200)]">Usuarios del grupo</h1>

      {!users?.length ? (
        <p className="text-center text-lg text-700 dark:text-300">
          No hay usuarios en este grupo.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-600 bg-200 dark:bg-800 border-400 dark:border-600 border-1 p-4 rounded shadow">
          {users.map((user: any) => (
            <li key={user.id} className="text-lg text-800 dark:text-50">
              👤 {user.username}
            </li>
          ))}
        </ul>
      )}

      <section className="w-full max-w-3xl mt-6">
        <h2 className="text-2xl font-semibold text-600 dark:text-200 mb-4 text-center">
          Equivalencias divertidas
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {statsData.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 p-4 rounded-lg bg-50 dark:bg-800 shadow border-l-4 border-400"
            >
              <div className="text-3xl">{icon}</div>
              <div>
                <p className="font-medium text-700 dark:text-300">
                  Has pagado el equivalente a
                </p>
                <p className="text-500 dark:text-200 font-bold text-lg">
                  {value} {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl mt-10 text-center">
        <h2 className="text-xl font-bold text-600 dark:text-200">Generador de Excusas</h2>
        <p className="text-700 dark:text-300">
          ¿No quieres pagar? Genera una excusa creativa para evitarlo.
        </p>

        <button
          onClick={handleChangeExcuse}
          className="clickButton mt-4 px-6 py-2"
        >
          Generar excusa
        </button>

        {excuse && (
          <div className="bg-50 dark:bg-800 p-6 rounded-lg shadow-md mt-6 relative">
            <h3 className="text-lg font-semibold text-700 dark:text-300">
              Tu excusa para hoy:
            </h3>
            <blockquote className="text-xl italic mt-4 text-[var(--color-900)] dark:text-[var(--color-50)] bg-[var(--color-100)] dark:bg-[var(--color-700)] p-4 rounded-md border-l-4 border-[var(--color-400)]">
              “{excuse}”
            </blockquote>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={copyExcuseToClipboard}
                className="clickButton px-4 py-2"
              >
                Copiar excusa
              </button>
              <button
                onClick={handleChangeExcuse}
                className="clickButton px-4 py-2"
              >
                Nueva excusa
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};