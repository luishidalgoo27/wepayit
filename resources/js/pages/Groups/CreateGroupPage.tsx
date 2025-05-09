import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { createExpense } from "@/services/expenses";
import { getUsersByGroup } from "@/services/users"; // <-- crea esta función en tu servicio
import { Expense } from "@/types/expense";
import { FolderKanban, BadgeEuro, Calendar, Type, FileText, Users } from "lucide-react";
import toast from "react-hot-toast";

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
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [usersDivision, setUsersDivision] = useState([{ user_id: "", assigned_amount: 0 }]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersByGroup(id);
        setUsers(response);
      } catch (err) {
        toast.error("Error al cargar usuarios");
      }
    };
    fetchUsers();
  }, [id]);

  const handleUserDivisionChange = (index: number, field: "user_id" | "assigned_amount", value: any) => {
    const updated = [...usersDivision];
    updated[index][field] = value;
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
    <form 
      onSubmit={handleSubmit}
      className="container max-w-xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-24"
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

      <div className="relative">
        <BadgeEuro className="absolute left-3 top-2 text-emerald-700" size={20} />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
        >
          <option value="">Selecciona una moneda</option>
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dólar ($)</option>
          <option value="GBP">Libra (£)</option>
          <option value="JPY">Yen (¥)</option>
        </select>
      </div>

      <div className="relative">
        <Type className="absolute left-3 top-3 text-emerald-700" size={20} />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl"
        />
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
        <label className="block font-semibold text-black flex items-center gap-2">
          <Users size={18} className="text-emerald-700" /> División entre usuarios:
        </label>
        {usersDivision.map((user, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={user.user_id}
              onChange={(e) => handleUserDivisionChange(index, "user_id", e.target.value)}
              className="w-1/2 bg-emerald-100 text-black px-4 py-2 rounded-xl"
            >
              <option value="">Selecciona usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
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
        className="w-full bg-emerald-100 text-black rounded-xl py-2 font-semibold shadow-md hover:bg-emerald-200 transition"
      >
        Crear Gasto
      </button>
    </form>
  );
};
