import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUserGroupExpenses } from "@/hooks/useGetUserGroupExpenses";
import { Link, LoaderFunctionArgs, NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Pencil } from "lucide-react";

function showBackButtonInGroupLayout(pathname: string) {
  return !(pathname === "/groups" || pathname === "/groups/");
}

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
  const id = params.id!;
  return { id };
}

// Subcomponentes
const GroupAvatar = ({ photo, alt }: { photo?: string; alt: string }) => (
  <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-500 dark:border-600">
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
  <div className="flex justify-around text-center bg-100 dark:bg-800 p-4 rounded-xl shadow-sm">
    <div>
      <p className="dark:text-300 text-700 text-sm">Mis gastos</p>
      <p className="text-xl font-semibold">
        {userExpense.toFixed(2)} {currency}
      </p>
    </div>
    <div>
      <p className="dark:text-300 text-700 text-sm">Gastos totales</p>
      <p className="text-xl font-semibold">
        {totalExpenses.toFixed(2)} {currency}
      </p>
    </div>
  </div>
);

export const GroupLayout = () => {
  const { id } = useLoaderData() as { id: string };
  const { group } = useGetGroup(id);
  const { userExpense, totalExpenses } = useGetUserGroupExpenses(id);
  const location = useLocation();

  return (
    <div className="container max-w-4xl mx-auto py-1 space-y-3 text-950 dark:text-50 px-6">
      {showBackButtonInGroupLayout(location.pathname) && <BackButton />}

      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-1">
        <GroupAvatar photo={group.photo ?? undefined} alt={`Avatar del grupo ${group.name}`} />
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-4xl font-bold tracking-tight">{group.name}</h1>
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
            `py-3 sectionCols border-r ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
          }
        >
          Gastos
        </NavLink>
        <NavLink
          to={`balances`}
          className={({ isActive }) =>
            `py-3 sectionCols ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
          }
        >
          Deudas
        </NavLink>
        <NavLink
          to={`games`}
          className={({ isActive }) =>
            `py-3 sectionCols border-x ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
          }
        >
          Juegos
        </NavLink>
        <NavLink
          to={`management`}
          className={({ isActive }) =>
            `py-3 sectionCols ${isActive ? "bg-600 text-white" : "hover:bg-400 dark:hover:bg-600"}`
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
  );
};
