import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUserGroupExpenses } from "@/hooks/useGetUserGroupExpenses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Link, LoaderFunctionArgs, NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Pencil, Info } from "lucide-react";

function showBackButtonInGroupLayout(pathname: string) {
  return !(pathname === "/groups" || pathname === "/groups/");
}

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
  const id = params.id!;
  return { id };
}

const GroupAvatar = ({ photo, alt }: { photo?: string; alt: string }) => (
  <div className="w-18 h-18 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-500 dark:border-600">
    <img
      src={
        photo ||
        "https://res.cloudinary.com/dotw4uex6/image/upload/v1747049502/ChatGPT_Image_12_may_2025_13_30_39_ook44q.png"
      }
      className="w-full h-full object-cover rounded-full"
      alt={alt}
    />
  </div>
);

const ExpenseSummary = ({
  userExpense,
  totalExpenses,
  currency,
}: {
  userExpense: number;
  totalExpenses: number;
  currency: string;
}) => (
  <div className="flex justify-around text-center bg-100 dark:bg-800 p-2 rounded-xl shadow-sm">
    <div>
      <p className="dark:text-300 text-700 text-sm">Mis gastos</p>
      <p className="text-xl font-semibold">
        {typeof userExpense === 'number' ? userExpense.toFixed(2) : '0.00'} {currency}
      </p>
    </div>
    <div>
      <p className="dark:text-300 text-700 text-sm">Gastos totales</p>
      <p className="text-xl font-semibold">
        {typeof totalExpenses === 'number' ? totalExpenses.toFixed(2) : '0.00'} {currency}
      </p>
    </div>
  </div>
);

const Tips = [
  "💡 Consejo: Puedes dividir gastos de forma desigual entre los miembros.",
  "🎉 Tip: Añade una descripción a cada gasto para recordar los detalles.",
  "🔔 Recuerda: Puedes notificar a tus amigos cuando pagues tu parte.",
  "📊 Consulta el balance para ver quién debe a quién en tiempo real.",
  "🧾 Adjunta recibos a tus gastos para mayor claridad.",
];

function getRandomTip() {
  return Tips[Math.floor(Math.random() * Tips.length)];
}

export const GroupLayout = () => {
  const { id } = useLoaderData() as { id: string };
  const { group } = useGetGroup(id);
  const { userExpense, totalExpenses } = useGetUserGroupExpenses(id);
  const { users } = useGetUsers(id);
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full flex justify-center">
      {/* Panel izquierdo: miembros del grupo */}
      <aside className="hidden lg:flex flex-col items-center gap-4 w-64 py-8 px-2">
        <div className="bg-white dark:bg-[var(--color-800)] rounded-2xl shadow-lg p-3 w-full">
          <h3 className="text-lg text-center font-bold mb-2 text-[var(--color-700)] dark:text-[var(--color-200)]">Miembros</h3>
          <div className="flex flex-col flex-wrap gap-2">
            {users.map(u => (
              <div key={u.id} className="flex items-center w-1/3">
                <img
                  src={u.avatar || "https://res.cloudinary.com/dotw4uex6/image/upload/v1747049503/ChatGPT_Image_12_may_2025_13_30_34_x0b7aa.png"}
                  alt={u.username}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                />
                <span className="text-sm ml-1  max-w-[60px]">@{u.username}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="container max-w-5xl mx-auto py-1 space-y-3 text-950 dark:text-50 px-4 z-10">
        {showBackButtonInGroupLayout(location.pathname) && <BackButton />}

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-1">
          <GroupAvatar photo={group.photo ?? undefined} alt={`Avatar del grupo ${group.name}`} />
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
            <Link
              to={`edit-group`}
              aria-label="Editar grupo"
              className="p-1.5 rounded-full hover:bg-200 dark:hover:bg-700 transition"
            >
              <Pencil className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Navegación */}
        <div className="grid grid-cols-4 bg-500 dark:bg-500 text-950 dark:text-50 border-2 border-300 rounded-xl shadow overflow-hidden text-center text-sm font-bold">
          <NavLink
            to={`expenses`}
            className={({ isActive }) =>
              `py-2 sectionCols border-r ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
            }
          >
            Gastos
          </NavLink>
          <NavLink
            to={`balances`}
            className={({ isActive }) =>
              `py-2 sectionCols ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
            }
          >
            Deudas
          </NavLink>
          <NavLink
            to={`games`}
            className={({ isActive }) =>
              `py-2 sectionCols border-x ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
            }
          >
            Juegos
          </NavLink>
          <NavLink
            to={`management`}
            className={({ isActive }) =>
              `py-2 sectionCols ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
            }
          >
            Usuarios
          </NavLink>
        </div>

        {/* Resumen */}
        <ExpenseSummary
          userExpense={userExpense}
          totalExpenses={totalExpenses}
          currency={group.currency_type}
        />

        {/* Subrutas */}
        <Outlet />
      </div>

      {/* Panel derecho: tip del día */}
      <aside className="hidden lg:flex flex-col items-center gap-4 w-64 py-8 px-2">
        <div className="bg-white dark:bg-[var(--color-800)] rounded-2xl shadow-lg p-3 w-full flex flex-col items-center">
          <Info className="w-7 h-7 text-[var(--color-500)] mb-2" />
          <h3 className="text-base font-bold mb-2 text-[var(--color-700)] dark:text-[var(--color-200)]">Consejo WePayIt</h3>
          <p className="text-sm text-[var(--color-700)] dark:text-[var(--color-200)] text-center">{getRandomTip()}</p>
        </div>
      </aside>
    </div>
  );
};