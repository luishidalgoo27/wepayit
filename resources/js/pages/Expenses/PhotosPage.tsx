import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { useGetGroup } from "@/hooks/useGetGroup"
import { useGetDivisions } from "@/hooks/useGetDivisions";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const PhotosPage = () => {
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
        <>
            {/* Boton añadir foto */}
            <Link
                to={`/groups/${id}/expenses/create-expense`}
                className="hover:translate-y-0.5 block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md"
            >
                + Añadir foto
            </Link>
        </>
    )
}