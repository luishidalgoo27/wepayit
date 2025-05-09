import { createExpense } from "@/services/expenses";
import { Expense, UserDivision } from "@/types/expense";
import { FolderKanban, BadgeEuro } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

// Loader para obtener el ID del grupo
export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const CreateExpensePage = () => {
    const { id } = useLoaderData() as { id: string };

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [currency, setCurrency] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [receipt, setReceipt] = useState("");
    const [usersDivision, setUsersDivision] = useState<UserDivision[]>([{ user_id: "", assigned_amount: 0 }]);

    const handleUserDivisionChange = (index: number, field: "user_id" | "assigned_amount", value: string | number) => {
        const updated = [...usersDivision];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setUsersDivision(updated);
    };

    const handleAddUserDivision = () => {
        setUsersDivision([...usersDivision, { user_id: "", assigned_amount: 0 }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense: Expense = {
            title,
            amount,
            currency_type: currency,
            date,
            description,
            category,
            receipt_url: receipt,
            group_id: id,
            users_division: usersDivision,
        };

        try {
            await createExpense(newExpense);
            toast.success("Gasto creado correctamente");

            // Limpiar campos
            setTitle("");
            setAmount(0);
            setDate("");
            setCurrency("");
            setDescription("");
            setCategory("");
            setReceipt("");
            setUsersDivision([{ user_id: "", assigned_amount: 0 }]);
        } catch (err: any) {
            toast.error(err.message || "Error al crear gasto");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container max-w-xl mx-auto py-8 space-y-6">
            <div className="relative">
                <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="text"
                    placeholder="Título del gasto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl"
                />
            </div>

            <div className="relative">
                <BadgeEuro className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl"
                />
            </div>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
            />

            <input
                type="text"
                placeholder="Moneda (EUR, USD, etc)"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
            />

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
            />

            <input
                type="text"
                placeholder="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
            />

            <input
                type="text"
                placeholder="URL del recibo (opcional)"
                value={receipt}
                onChange={(e) => setReceipt(e.target.value)}
                className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
            />

            <div className="space-y-2">
                <label className="block font-semibold">División entre usuarios:</label>
                {usersDivision.map((user, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="ID usuario"
                            value={user.user_id}
                            onChange={(e) => handleUserDivisionChange(index, "user_id", e.target.value)}
                            className="w-1/2 bg-emerald-100 text-black px-4 py-2 rounded-xl"
                        />
                        <input
                            type="number"
                            placeholder="Cantidad asignada"
                            value={user.assigned_amount}
                            onChange={(e) => handleUserDivisionChange(index, "assigned_amount", Number(e.target.value))}
                            className="w-1/2 bg-emerald-100 text-black px-4 py-2 rounded-xl"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddUserDivision}
                    className="text-sm text-emerald-700 underline"
                >
                    + Añadir usuario
                </button>
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-xl font-semibold"
            >
                Crear gasto
            </button>
        </form>
    );
};
