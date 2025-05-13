// src/layouts/GroupLayout.tsx
import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";
import { Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const GroupLayout = () => {
    const { id } = useLoaderData() as { id: string }
    const { group } = useGetGroup(id)
    const { divisions } = useGetDivisions(id);
    const { user } = useGetUser();

    const [userExpense, setUserExpense] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    useEffect(() => {
        if (!divisions || !user) return;

        const totalGroup = divisions.reduce((sum, division) => sum + division.assigned_amount, 0);
        setTotalExpenses(totalGroup);

        const totalUser = divisions
            .filter((division) => division.user_id === user.id)
            .reduce((sum, division) => sum + division.assigned_amount, 0);
        setUserExpense(totalUser);
    }, [divisions, user]);

    return (
        <div className="container max-w-4xl mx-auto py-10 space-y-10 text-950 dark:text-50">
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
                <div className="grid grid-cols-3 bg-700 dark:bg-200 text-50 dark:text-800 border rounded-xl shadow-sm overflow-hidden text-center text-sm font-medium">
                    <Link to={`expenses`} className="py-3 dark:hover:bg-100 dark:hover:text-950 hover:bg-600 hover:text-200">
                        Gastos
                    </Link>
                    <Link to={`balances`} className="py-3 border-x dark:hover:bg-100 dark:hover:text-950 hover:bg-600 hover:text-200">
                        Saldos
                    </Link>
                    <Link to={`photos`} className="py-3 dark:hover:bg-100 dark:hover:text-950 hover:bg-600 hover:text-200">
                        Fotos
                    </Link>
                </div>

                {/* Resumen */}
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-gray-500 text-sm">Mis gastos</p>
                        <p className="text-xl font-semibold">{userExpense.toFixed(2)} {group?.currency_type}</p>
                    </div>
                    <div>
                        <p className="text-950 dark:text-100 text-sm">Gastos totales</p>
                        <p className="text-xl text-950 dark:text-50 font-semibold">
                            {totalExpenses.toFixed(2)} {group?.currency_type}
                        </p>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
};
