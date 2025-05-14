// src/layouts/GroupLayout.tsx
import { useGroupContext } from "@/context/GroupContext";
import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetExpenses } from "@/hooks/useGetExpenses";
import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";
import { Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const GroupLayout = () => {
    const { id } = useLoaderData() as { id: string };
    const { group } = useGetGroup(id);
    const { divisions } = useGetDivisions(id);
    const { expenses } = useGetExpenses(id);
    const { user } = useGetUser();

    const { userExpense, setUserExpense } = useGroupContext();

    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    useEffect(() => {
        if (!divisions || !user || !expenses) return;

        // Calcular gastos totales del grupo
        const totalGroup = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpenses(totalGroup);

        // Calcular gastos asignados al usuario
        const totalUser = divisions
            .filter((division) => division.user_id === user.id)
            .reduce((sum, division) => sum + division.assigned_amount, 0);
        setUserExpense(totalUser); // Actualizar el contexto
    }, [divisions, user, expenses, setUserExpense]);

    return (
        <div className="container max-w-4xl mx-auto py-2 space-y-10 text-950 dark:text-50 px-8">
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
            <Link 
                to="/groups/edit-group"
                className="clickButton  w-auto p-5 text-center  font-semibold py-3 rounded-xl shadow-md"
            >
                Editar Grupo
            </Link>
                </div>
                {/* Navegación */}
                <div className="grid grid-cols-4 bg-500 dark:bg-500 text-950 dark:text-50 border-2 border-300 rounded-xl shadow-sm overflow-hidden text-center text-sm font-medium">
                    <Link to={`expenses`} className="py-3 border-r sectionCols">
                        Gastos
                    </Link>
                    <Link to={`balances`} className="py-3 sectionCols">
                        Saldos
                    </Link>
                    <Link to={`photos`} className="py-3 border-x sectionCols">
                        Fotos
                    </Link>
                    <Link to={`games`} className="py-3 sectionCols">
                        Juegos
                    </Link>
                </div>

                {/* Resumen */}
                <div className="flex justify-around text-center">
                    <div>
                        <p className="dark:text-300 text-700 text-sm">Mis gastos</p>
                        <p className="text-xl font-semibold">{userExpense.toFixed(2)} {group?.currency_type}</p>
                    </div>
                    <div>
                        <p className="dark:text-300 text-700 text-sm">Gastos totales</p>
                        <p className="text-xl font-semibold">{totalExpenses.toFixed(2)} {group?.currency_type}</p>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
};
