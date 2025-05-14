import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetUserGroupExpenses } from "@/hooks/useGetUserGroupExpenses";
import { generateRandomExcuse } from "@/utils/excuse";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
  const id = params.id!;
  return { id };
}

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
    <div className="box-2 flex flex-col items-center gap-8 px-6 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--color-400)] dark:text-[var(--color-200)]">Usuarios del grupo</h1>

      {!users?.length ? (
        <p className="text-center text-lg text-[var(--color-700)] dark:text-[var(--color-300)]">
          No hay usuarios en este grupo.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 bg-[var(--color-50)] dark:bg-[var(--color-800)] p-4 rounded shadow">
          {users.map((user: any) => (
            <li key={user.id} className="text-lg text-[var(--color-900)] dark:text-[var(--color-50)]">
              👤 {user.name}
            </li>
          ))}
        </ul>
      )}

      <section className="w-full max-w-3xl mt-6">
        <h2 className="text-2xl font-semibold text-[var(--color-400)] dark:text-[var(--color-200)] mb-4 text-center">
          Equivalencias divertidas
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {statsData.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 p-4 rounded-lg bg-[var(--color-50)] dark:bg-[var(--color-800)] shadow border-l-4 border-[var(--color-400)]"
            >
              <div className="text-3xl">{icon}</div>
              <div>
                <p className="font-medium text-[var(--color-700)] dark:text-[var(--color-300)]">
                  Has pagado el equivalente a
                </p>
                <p className="text-[var(--color-400)] dark:text-[var(--color-200)] font-bold text-lg">
                  {value} {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl mt-10 text-center">
        <h2 className="text-xl font-bold text-[var(--color-400)] dark:text-[var(--color-200)]">Generador de Excusas</h2>
        <p className="text-[var(--color-700)] dark:text-[var(--color-300)]">
          ¿No quieres pagar? Genera una excusa creativa para evitarlo.
        </p>

        <button
          onClick={handleChangeExcuse}
          className="mt-4 px-6 py-2 bg-[var(--color-400)] hover:bg-[var(--color-300)] text-[var(--color-50)] rounded-full transition"
        >
          Generar excusa
        </button>

        {excuse && (
          <div className="bg-[var(--color-50)] dark:bg-[var(--color-800)] p-6 rounded-lg shadow-md mt-6 relative">
            <h3 className="text-lg font-semibold text-[var(--color-700)] dark:text-[var(--color-300)]">
              Tu excusa para hoy:
            </h3>
            <blockquote className="text-xl italic mt-4 text-[var(--color-900)] dark:text-[var(--color-50)] bg-[var(--color-100)] dark:bg-[var(--color-700)] p-4 rounded-md border-l-4 border-[var(--color-400)]">
              “{excuse}”
            </blockquote>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={copyExcuseToClipboard}
                className="px-4 py-2 bg-[var(--color-400)] hover:bg-[var(--color-300)] text-[var(--color-50)] rounded-full transition"
              >
                Copiar excusa
              </button>
              <button
                onClick={handleChangeExcuse}
                className="px-4 py-2 bg-[var(--color-300)] hover:bg-[var(--color-400)] text-[var(--color-50)] rounded-full transition"
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