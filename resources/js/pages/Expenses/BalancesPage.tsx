import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { useGetGroup } from "@/hooks/useGetGroup"
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { useGetDivisions } from "@/hooks/useGetDivisions";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const BalancesPage = () => {
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
        </>
    )
}