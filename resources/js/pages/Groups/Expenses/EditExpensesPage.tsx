import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { FolderKanban, BadgeEuro, Calendar, Type, FileText, Users } from "lucide-react";
import toast from "react-hot-toast";
import { updateExpense } from "@/services/expenses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetExpense } from "@/hooks/useGetExpense";
import { useGetDivisions } from "@/hooks/useGetDivisions";
import { UserDivision } from "@/types/expense";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string, expenseId: string }> {
    const id = params.id!;
    const expenseId = params.expenseId!;

    return { id, expenseId };
}

export const EditExpensePage = () => {
    const navigate = useNavigate();
    const { id, expenseId } = useLoaderData() as { id: string; expenseId: string };

    const { users, loading: loadingUsers } = useGetUsers(id);
    const { categories, loading: loadingCategories } = useGetCategories();
    const { expense, loading: loadingExpense } = useGetExpense(expenseId);
    const { divisions, loading: loadingDivisions } = useGetDivisions(id);

    const [payerId, setPayerId] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [currency, setCurrency] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [usersDivision, setUsersDivision] = useState<UserDivision[]>([]);
    const [currencies, setCurrencies] = useState([
        { code: "EUR", name: "Euro (€)" },
        { code: "USD", name: "Dólar ($)" },
        { code: "GBP", name: "Libra (£)" },
        { code: "JPY", name: "Yen (¥)" },
    ]);
    const [showAllCurrencies, setShowAllCurrencies] = useState(false);

    const loading = loadingUsers || loadingCategories || loadingExpense || loadingDivisions;

    useEffect(() => {
        // Solo repartir si hay datos cargados y hay al menos un usuario seleccionado
        if (!usersDivision.length || amount === 0) return;

        // Si la suma de los asignados es distinta al amount, repartir
        const selected = usersDivision.filter(u => u.selected);
        if (!selected.length) return;

        const assignedSum = selected.reduce((sum, u) => sum + u.assigned_amount, 0);

        // Solo repartir si la suma no cuadra (es decir, es la carga inicial o el amount cambió)
        if (Math.abs(assignedSum - amount) > 0.01) {
            const share = Number((amount / selected.length).toFixed(2));
            const updated = usersDivision.map(u =>
                u.selected ? { ...u, assigned_amount: share } : { ...u, assigned_amount: 0 }
            );
            setUsersDivision(updated);
        }
    }, [amount, usersDivision.length, usersDivision.some(u => u.selected)]);


    useEffect(() => {
        if (expense && divisions) {
            setPayerId(expense.paid_by);
            setTitle(expense.title);
            setAmount(expense.amount);
            setDate(expense.date);
            setCurrency(expense.currency_type);
            setDescription(expense.description ?? "");
            setCategory(String(expense.category_id ?? ""));
            setUsersDivision(
                users.map(user => {
                    const match = divisions.find(d => d.user_id === user.id);
                    return {
                        user_id: user.id,
                        selected: !!match,
                        assigned_amount: typeof match?.assigned_amount === "number" ? match.assigned_amount : Number(match?.assigned_amount) || 0,
                    };
                })
            );
        }
    }, [expense, divisions, users]);

    const handleShowMoreCurrencies = async () => {
        try {
            const response = await fetch("https://api.exchangerate.host/list");
            const data = await response.json();
            if (data && data.currencies) {
                const newCurrencies = Object.keys(data.currencies).map((key) => ({
                    code: key,
                    name: `${data.currencies[key]} (${key})`,
                }));
                setCurrencies(newCurrencies);
                setShowAllCurrencies(true);
            } else {
                toast.error("No se pudieron cargar las monedas.");
            }
        } catch {
            toast.error("Error al cargar las monedas.");
        }
    };

    const handleShowLessCurrencies = () => {
        setCurrencies([
            { code: "EUR", name: "Euro (€)" },
            { code: "USD", name: "Dólar ($)" },
            { code: "GBP", name: "Libra (£)" },
            { code: "JPY", name: "Yen (¥)" },
        ]);
        setShowAllCurrencies(false);
    };

    const handleCurrencyChange = (value: string) => {
        if (value === "show_more") {
            handleShowMoreCurrencies();
        } else if (value === "show_less") {
            handleShowLessCurrencies();
        } else {
            setCurrency(value);
        }
    };

    const handleUserDivisionChange = (
        index: number,
        field: "assigned_amount" | "selected",
        value: number | boolean
    ) => {
        let updated = [...usersDivision];

        if (field === "selected") {
            updated[index].selected = value as boolean;
            const selected = updated.filter(u => u.selected);
            const count = selected.length;
            const share = count > 0 ? Number((amount / count).toFixed(2)) : 0;
            updated = updated.map(u =>
                u.selected
                    ? { ...u, assigned_amount: share }
                    : { ...u, assigned_amount: 0 }
            );
            setUsersDivision(updated);
            return;
        }

        if (field === "assigned_amount") {
            // Solo usuarios seleccionados
            const selectedIndexes = updated
                .map((u, i) => (u.selected ? i : -1))
                .filter(i => i !== -1);

            // Si solo hay uno seleccionado, asigna todo el amount
            if (selectedIndexes.length === 1) {
                updated[selectedIndexes[0]].assigned_amount = amount;
                setUsersDivision(updated);
                return;
            }

            // Limitar el valor máximo posible
            let inputValue = Math.max(0, Math.min(Number(value), amount));
            updated[index].assigned_amount = inputValue;

            // Recalcula los seleccionados después de posible deselección
            const newSelectedIndexes = updated
                .map((u, i) => (u.selected ? i : -1))
                .filter(i => i !== -1);

            // Si solo queda uno seleccionado, asigna todo el amount a ese
            if (newSelectedIndexes.length === 1) {
                updated[newSelectedIndexes[0]].assigned_amount = amount;
                setUsersDivision(updated);
                return;
            }

            // Repartir el resto entre los demás seleccionados
            const otherIndexes = newSelectedIndexes.filter(i => i !== index);
            let remaining = amount - inputValue;

            if (remaining < 0) {
                toast.error("La suma de las cantidades no puede superar el monto total.");
                return;
            }

            // Reparto equitativo, el último recibe el ajuste para cuadrar decimales
            let totalAssigned = 0;
            otherIndexes.forEach((i, idx) => {
                let share = 0;
                if (otherIndexes.length === 1) {
                    share = remaining;
                } else if (idx === otherIndexes.length - 1) {
                    share = Number((remaining - totalAssigned).toFixed(2));
                } else {
                    share = Number((remaining / otherIndexes.length).toFixed(2));
                    totalAssigned += share;
                }
                updated[i].assigned_amount = share;
            });

            setUsersDivision(updated);
            return;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateExpense({
                paid_by: payerId,
                expense_id: Number(expenseId),
                title,
                amount,
                currency_type: currency,
                date,
                description,
                category_id: Number(category),
                group_id: id,
                users_division: usersDivision
                    .filter((u) => u.selected)
                    .map(({ user_id, assigned_amount, selected }) => ({ user_id, assigned_amount, selected })),
            });

            toast.success("Gasto actualizado correctamente");
            navigate(`/groups/${id}/expenses`);
        } catch (err: any) {
            const errors = err.response?.data?.errors
                ? Object.values(err.response.data.errors).flat()
                : [err.response?.data?.message || "Error desconocido. Inténtalo de nuevo."];

            errors.forEach((message: string) => toast.error(message));
        }
    };

    if (loading) {
        return <div className="text-center mt-24 text-lg text-gray-700">Cargando datos del gasto...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[75vh]">
            <form
                onSubmit={handleSubmit}
                className="container max-w-2xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
            >
                <h1 className="text-center text-3xl font-bold mb-6">Editar gasto</h1>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FolderKanban className="absolute left-3 top-3 text-700" size={20} />
                        <input
                            type="text"
                            placeholder="Título del gasto"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="labelForm"
                        />
                    </div>

                    <div className="relative">
                        <Calendar className="absolute left-3 top-2 text-700" size={20} />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="labelForm"
                        />
                    </div>

                    <div className="relative">
                        <BadgeEuro className="absolute left-3 top-3 text-700" size={20} />
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={amount === 0 ? "" : amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="labelForm"
                        />
                    </div>

                    <div className="relative">
                        <BadgeEuro className="absolute left-3 top-2 text-700" size={20} />
                        <select
                            value={currency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            className="labelForm"
                        >
                            <option value="">Selecciona una moneda</option>
                            {currencies.map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.name}
                                </option>
                            ))}
                            {!showAllCurrencies ? (
                                <option value="show_more">Mostrar más monedas</option>
                            ) : (
                                <option value="show_less">Mostrar menos monedas</option>
                            )}
                        </select>
                    </div>

                    <div className="relative">
                        <Users className="absolute left-3 top-2 text-700" size={20} />
                        <select
                            value={payerId ?? ""}
                            onChange={e => setPayerId(Number(e.target.value))}
                            className="labelForm"
                            required
                            disabled
                        >
                            <option value="">Selecciona quién paga</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <Type className="absolute left-3 top-2 text-700" size={20} />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="labelForm"
                        >
                            <option value="">Selecciona una categoría</option>
                            {!loadingCategories && categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative md:col-span-2">
                        <FileText className="absolute left-3 top-3 text-700" size={20} />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="labelForm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="font-semibold dark:text-200 text-700 flex items-center gap-2 mb-2">
                        <Users size={18} className="dark:text-100 text-950" /> Selección de usuarios:
                    </label>

                    <div className="space-y-3">
                        {users.map((user, index) => (
                            <div key={user.id} className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-6 flex items-center gap-2 cursor-pointer select-none">
                                    <span className="relative">
                                        <input
                                            type="checkbox"
                                            checked={usersDivision[index]?.selected || false}
                                            onChange={(e) =>
                                                handleUserDivisionChange(index, "selected", e.target.checked)
                                            }
                                            className="peer appearance-none w-5 h-5 border-2 border-600 rounded-md bg-100 checked:bg-600 checked:border-400 transition-all duration-200 focus:outline-none"
                                        />
                                        <svg
                                            className="pointer-events-none absolute left-0 top-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M6 10.5L9 13.5L14 8.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-900 dark:text-100 font-medium">
                                        {user.username}
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Cantidad asignada"
                                    value={usersDivision[index]?.assigned_amount ?? ""}
                                    onChange={(e) =>
                                        handleUserDivisionChange(index, "assigned_amount", Number(e.target.value))
                                    }
                                    // Quita el onBlur que deselecciona automáticamente
                                    className="bg-100 text-950 px-4 py-2 rounded-xl col-span-6"
                                    disabled={!usersDivision[index]?.selected}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full clickButton py-2 font-semibold shadow-md mt-6"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};
