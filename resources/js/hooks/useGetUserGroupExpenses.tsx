import { useEffect, useState } from "react";
import { useGetGroup } from "./useGetGroup";
import { useGetUser } from "./useGetUser";
import { totalGroupExpenses, totalUserExpenses } from "@/services/expenses";

export const useGetUserGroupExpenses = (id: string) => {
    const [userExpense, setUserExpense] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const { user } = useGetUser();
    const { group } = useGetGroup(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userExpenseData = await totalUserExpenses(id);
                const totalExpensesData = await totalGroupExpenses(id);

                setUserExpense(userExpenseData);
                setTotalExpenses(totalExpensesData);
            } catch (error) {
                console.error("Error fetching expenses data:", error);
            }
        };

        fetchData();
    }, [user, group]);

    return { userExpense, totalExpenses };
}