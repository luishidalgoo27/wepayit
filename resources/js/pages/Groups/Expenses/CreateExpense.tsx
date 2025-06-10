import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { FolderKanban, BadgeEuro, Calendar, Type, FileText, Users } from "lucide-react";
import toast from "react-hot-toast";
import { createExpense } from "@/services/expenses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { CreateExpense, UserDivision } from "@/types/expense";
import { useGetCategories } from "@/hooks/useGetCategories";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export const CreateExpensePage = () => {
    const navigate = useNavigate();
    const { id } = useLoaderData() as { id: string };

    const { users, loading: loadingUsers } = useGetUsers(id);
    const { categories, loading: loadingCategories } = useGetCategories();
    const [uploading, setUploading] = useState(false);

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

    const loading = loadingUsers || loadingCategories;

    useEffect(() => {
        if (!loading && usersDivision.length === 0) {
            setUsersDivision(
                users.map((user) => ({
                    user_id: user.id,
                    assigned_amount: 0,
                    selected: true,
                }))
            );
        }
    }, [loading, users]);



    useEffect(() => {
        const selectedUsers = usersDivision.filter(u => u.selected);
        const count = selectedUsers.length;
        if (count === 0 || isNaN(amount)) return;

        const divided = parseFloat((amount / count).toFixed(2));

        const updated = usersDivision.map(user => {
            if (user.selected) {
                return { ...user, assigned_amount: divided };
            }
            return user;
        });

        setUsersDivision(updated);
    }, [amount]);

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
        const updated = usersDivision.map(u => ({ ...u }));

        if (field === "selected") {
            updated[index].selected = value as boolean;

            // No permitir que quede ninguno seleccionado
            const selectedCount = updated.filter(u => u.selected).length;
            if (selectedCount === 0) {
                toast.error("Debe haber al menos 1 usuario seleccionado.");
                return;
            }

            // Reparto equitativo si hay más de uno seleccionado y hay amount
            if (amount > 0) {
                const divided = parseFloat((amount / selectedCount).toFixed(2));
                let total = 0;
                updated.forEach((u, i) => {
                    if (u.selected) {
                        // El último recibe el ajuste para cuadrar decimales
                        if (i === updated.length - 1 || updated.filter(x => x.selected).length === 1) {
                            u.assigned_amount = parseFloat((amount - total).toFixed(2));
                        } else {
                            u.assigned_amount = divided;
                            total += divided;
                        }
                    } else {
                        u.assigned_amount = 0;
                    }
                });
            } else {
                updated.forEach(u => {
                    if (!u.selected) u.assigned_amount = 0;
                });
            }

            setUsersDivision(updated);
            return;
        }

        if (field === "assigned_amount") {
            // Permitir campo vacío para edición cómoda
            if (value === null || value === undefined) {
                updated[index].assigned_amount = 0;
                setUsersDivision(updated);
                return;
            }

            // Solo usuarios seleccionados
            const selectedIndexes = updated
                .map((u, i) => (u.selected ? i : -1))
                .filter(i => i !== -1);

            if (selectedIndexes.length <= 1) {
                toast.error("Debe haber al menos 2 usuarios seleccionados para dividir el gasto.");
                return;
            }

            // Limitar el valor máximo posible
            let inputValue = Math.max(0, Math.min(Number(value), amount));
            updated[index].assigned_amount = inputValue;

            // Repartir el resto entre los demás seleccionados
            const otherIndexes = updated
                .map((u, i) => (u.selected ? i : -1))
                .filter(i => i !== -1)
                .filter(i => i !== index);

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

        const newExpense: CreateExpense = {
            paid_by: payerId,
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
        };

        try {
            setUploading(true);
            await createExpense(newExpense);
            toast.success("Gasto creado correctamente");
            navigate(`/groups/${id}/expenses`);

        } catch (err: any) {
            const errors = err.response?.data?.errors
                ? Object.values(err.response.data.errors).flat()
                : [err.response?.data?.message || "Error desconocido. Inténtalo de nuevo."];

            errors.forEach((message: string) => toast.error(message));
            setUploading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-24 text-lg text-gray-700">Cargando usuarios...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[75vh]">
            <form
                onSubmit={handleSubmit}
                className="container max-w-2xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
            >
                <LoadingOverlay show={uploading} message="Creando Gasto..." />

                <h1 className="text-center text-3xl font-bold mb-6">Crear nuevo gasto</h1>

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
                        <Calendar className="absolute left-3 top-3 text-700" size={20} />
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
                                    value={
                                        usersDivision[index]?.assigned_amount === undefined || usersDivision[index]?.assigned_amount === null
                                            ? ""
                                            : usersDivision[index]?.assigned_amount
                                    }
                                    onChange={(e) =>
                                        handleUserDivisionChange(index, "assigned_amount", e.target.value === "" ? 0 : Number(e.target.value))
                                    }
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
                    Crear Gasto
                </button>
            </form>
        </div>

    );
};
