import { useGetGroup } from "@/hooks/useGetGroup";
import { useGetUserGroupExpenses } from "@/hooks/useGetUserGroupExpenses";
import { Link, LoaderFunctionArgs, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Pencil } from "lucide-react";

// Función para decidir si mostrar el BackButton en este layout
function showBackButtonInGroupLayout(pathname: string) {
    // Oculta el botón solo en la página principal de grupos
    return !(pathname === "/groups" || pathname === "/groups/");
}

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const GroupLayout = () => {
    const { id } = useLoaderData() as { id: string };
    const { group } = useGetGroup(id);
    const { userExpense, totalExpenses } = useGetUserGroupExpenses(id);
    const location = useLocation();

    return (
        <div className="container max-w-4xl mx-auto py-2 space-y-10 text-950 dark:text-50 px-8">
            {showBackButtonInGroupLayout(location.pathname) && <BackButton />}
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                    {group.photo ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                            <img
                                src={group.photo}
                                className="w-full h-full rounded-full object-cover border-4 border-500 dark:border-600 shadow"
                                alt="Avatar del grupo"
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                            <img
                                src="https://res.cloudinary.com/dotw4uex6/image/upload/v1747049502/ChatGPT_Image_12_may_2025_13_30_39_ook44q.png"
                                className="w-full h-full rounded-full object-cover border-4 border-500 dark:border-600 shadow"
                                alt="Avatar del grupo"
                            />
                        </div>
                    )}
                    <div className="flex">
                        <h1 className="text-4xl font-bold tracking-tight ml-9">{group.name}</h1>
                        <Link to="/groups/edit-group" className=" p-2">
                        <Pencil />
                        </Link>
                    </div>
                </div>

                {/* Navegación */}
                <div className="grid grid-cols-4 bg-500 dark:bg-500 text-950 dark:text-50 border-2 border-300 rounded-xl shadow-sm overflow-hidden text-center text-sm font-bold">
                    <Link to={`expenses`} className="py-3 border-r sectionCols">
                        Gastos
                    </Link>
                    <Link to={`balances`} className="py-3 sectionCols">
                        Saldos
                    </Link>
                    <Link to={`games`} className="py-3 border-x sectionCols">
                        Juegos
                    </Link>
                    <Link to={`management`} className="py-3 sectionCols">
                        Usuarios
                    </Link>
                </div>

                {/* Resumen */}
                <div className="flex justify-around text-center">
                    <div>
                        <p className="dark:text-300 text-700 text-sm">Mis gastos</p>
                        <p className="text-xl font-semibold">{userExpense} {group.currency_type}</p>
                    </div>
                    <div>
                        <p className="dark:text-300 text-700 text-sm">Gastos totales</p>
                        <p className="text-xl font-semibold">{totalExpenses} {group.currency_type}</p>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
};