import { Group } from "@/types/group";
import { Link } from "react-router-dom";

interface GroupHeaderProps {
  id: string;
  group: Group
  userExpense: number;
  totalExpenses: number;
}

export const GroupHeader = ({ id, group, userExpense, totalExpenses }: GroupHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        {group?.photo ? (
          <img className="w-14 h-14 rounded-full shadow-md" src={group.photo} alt="Grupo" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight">{group?.name}</h1>
      </div>

      {/* Navegación */}
      <div className="grid grid-cols-3 bg-white border rounded-xl shadow-sm overflow-hidden text-center text-sm font-medium">
        <Link to={`/groups/${id}/expenses`} className="py-3 hover:bg-gray-100">
          Gastos
        </Link>
        <Link to={`/groups/${id}/balances`} className="py-3 border-x hover:bg-gray-100">
          Saldos
        </Link>
        <Link to={`/groups/${id}/photos`} className="py-3 hover:bg-gray-100">
          Fotos
        </Link>
      </div>

      {/* Resumen */}
      <div className="flex justify-around text-center">
        <div>
          <p className="text-gray-500 text-sm">Mis gastos</p>
          <p className="text-xl font-semibold">{userExpense.toFixed(2)} €</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Gastos totales</p>
          <p className="text-xl font-semibold">
            {totalExpenses.toFixed(2)} {group?.currency_type}
          </p>
        </div>
      </div>
    </div>
  );
};
