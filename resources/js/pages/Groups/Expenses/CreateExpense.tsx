import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { FolderKanban, BadgeEuro, Calendar, Type, FileText, Users } from "lucide-react";
import toast from "react-hot-toast";
import { createExpense } from "@/services/expenses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { CreateExpense, UserDivision } from "@/types/expense";
import { useGetCategories } from "@/hooks/useGetCategories";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const CreateExpensePage = () => {
    const navigate = useNavigate()

    const { id } = useLoaderData() as { id: string }
    const { users, loading: loadingUsers } = useGetUsers(id);
    const { categories, loading: loadingCategories } = useGetCategories();

    const loading = loadingUsers || loadingCategories;

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState("")
    const [currency, setCurrency] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [receipt, setReceipt] = useState("")
    const [usersDivision, setUsersDivision] = useState<UserDivision[]>([])
    const [currencies, setCurrencies] = useState([
        { code: "EUR", name: "Euro (€)" },
        { code: "USD", name: "Dólar ($)" },
        { code: "GBP", name: "Libra (£)" },
        { code: "JPY", name: "Yen (¥)" },
    ]);
    const [showAllCurrencies, setShowAllCurrencies] = useState(false);
    const handleShowMoreCurrencies = async () => {
    try {
    const response = await fetch(
        "https://api.exchangerate.host/list?access_key=545bfb975ab03c81e3f1a344a7ecd593"
    );
    const data = await response.json();

    if (data && data.currencies) {
        const newCurrencies = Object.keys(data.currencies).map((key) => ({
        code: key,
        name: `${data.currencies[key]} (${key})`,
        }));
        setCurrencies(newCurrencies);
        setShowAllCurrencies(true); // Cambia el estado para mostrar todas las monedas
    } else {
        toast.error("No se pudieron cargar las monedas.");
    }
    } catch (error) {
        toast.error("Error al cargar las monedas.");
    }
    };

    const handleShowLessCurrencies = () => {
        // Restablece las monedas iniciales y cambia el estado
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

    useEffect(() => {
        if (!loading) {
            setUsersDivision(
                users.map((user) => ({
                    user_id: user.id,
                    assigned_amount: 0,
                    selected: false,
                }))
            );
        }
    }, [users, loading]);


    const handleUserDivisionChange = (
        index: number,
        field: "assigned_amount" | "selected",
        value: number | boolean
    ) => {
        const updated = [...usersDivision];
        updated[index][field] = value as never;
        setUsersDivision(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense: CreateExpense = {
            title,
            amount,
            currency_type: currency,
            date,
            description,
            category,
            receipt_url: receipt,
            group_id: id,
            users_division: usersDivision
                .filter((u) => u.selected)
                .map(({ user_id, assigned_amount, selected }) => ({ user_id, assigned_amount, selected })),
        };

        try {
            await createExpense(newExpense);
            toast.success("Gasto creado correctamente");
            setTitle("");
            setAmount(0);
            setDate("");
            setCurrency("");
            setDescription("");
            setCategory("");
            setReceipt("");
            setUsersDivision(users.map(user => ({
                user_id: user.id,
                assigned_amount: 0,
                selected: false,
            })));
            navigate(`/groups/${id}/expenses`)
        } catch (err: any) {
           const errors = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat() // Aplanar los mensajes de error
        : [err.response?.data?.message || "Error desconocido. Inténtalo de nuevo."];

        // Mostrar cada error como un toast separado
         errors.forEach((message: string) => toast.error(message));
        }
    };

    if (loading) {
        return <div className="text-center mt-24 text-lg text-gray-700">Cargando usuarios...</div>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="container max-w-xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
        >
            <h1 className="text-center text-3xl font-bold mb-4">Crear nuevo gasto</h1>

            <div className="relative">
                <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="text"
                    placeholder="Título del gasto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                />
            </div>

            <div className="relative">
                <BadgeEuro className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                />
            </div>

            <div className="relative">
                <Calendar className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                />
            </div>

             {/* Moneda */}
        <div className="relative">
            <BadgeEuro className="absolute left-3 top-2 text-emerald-700" size={20} />
            <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
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
                <Type className="absolute left-3 top-3 text-emerald-700" size={20} />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                >
                    <option value="">Selecciona una categoría</option>
                    {!loadingCategories && categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.type}>{cat.type}</option>
                    ))}


                </select>
            </div>

            <div className="relative">
                <FileText className="absolute left-3 top-3 text-emerald-700" size={20} />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl"
                />
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="URL del recibo (opcional)"
                    value={receipt}
                    onChange={(e) => setReceipt(e.target.value)}
                    className="w-full bg-emerald-100 text-black px-4 py-2 rounded-xl"
                />
            </div>

            <div className="space-y-2">
                <label className="font-semibold text-black flex items-center gap-2">
                    <Users size={18} className="text-emerald-700" /> Selección de usuarios:
                </label>

                {users.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-4">
                        <label className="flex items-center gap-2 w-1/2">
                            <input
                                type="checkbox"
                                checked={usersDivision[index]?.selected || false}
                                onChange={(e) =>
                                    handleUserDivisionChange(index, "selected", e.target.checked)
                                }
                            />
                            {user.name}
                        </label>
                        <input
                            type="number"
                            placeholder="Cantidad asignada"
                            value={usersDivision[index]?.assigned_amount || 0}
                            onChange={(e) =>
                                handleUserDivisionChange(index, "assigned_amount", Number(e.target.value))
                            }
                            className="bg-emerald-100 text-black px-4 py-2 rounded-xl w-1/2"
                            disabled={!usersDivision[index]?.selected}
                        />
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-100 text-black rounded-xl py-2 font-semibold shadow-md hover:bg-emerald-200 transition"
            >
                Crear Gasto
            </button>
        </form>
    );
};
