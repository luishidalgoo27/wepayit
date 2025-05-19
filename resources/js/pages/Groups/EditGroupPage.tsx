import { ImagePlus, FolderKanban, BadgeEuro, Type } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { updateGroup } from "@/services/groups";
import { useGetGroup } from "@/hooks/useGetGroup";

export const EditGroupPage = () => {
  const navigate = useNavigate()

  const { id } = useLoaderData() as { id: string };
  const { group } = useGetGroup(id)
  
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [currencies, setCurrencies] = useState([
    { code: "EUR", name: "Euro (€)" },
    { code: "USD", name: "Dólar ($)" },
    { code: "GBP", name: "Libra (£)" },
    { code: "JPY", name: "Yen (¥)" },
  ]);
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setCurrency(group.currency_type);
      setDescription(group.description);
    }
  }, [group]);


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
        setShowAllCurrencies(true);
      } else {
        toast.error("No se pudieron cargar las monedas.");
      }
    } catch (error) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateGroup(id, name, currency, description, image);
      toast.success("Grupo actualizado correctamente");
      setName("");
      setCurrency("");
      setDescription("");
      setImage(null);
      navigate(`/groups/${id}/management`)
    } catch (err: any) {
      const errors = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat()
        : [err.response?.data?.message || "Error desconocido. Inténtalo de nuevo."];

      // Mostrar cada error como un toast separado
      errors.forEach((message: string) => toast.error(message));
    }
  };
  
  return (
      
      <form
      onSubmit={handleSubmit}
      className="container max-w-xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 "
      >
      <h1 className="text-center text-3xl font-bold mb-4">Editar grupo</h1>

      {/* Nombre del grupo */}
      <div className="relative">
        <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
        <input
          type="text"
          placeholder="Nuevo nombre del grupo"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          <option value="">Selecciona una nueva moneda</option>
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

      {/* Descripción */}
      <div className="relative">
        <Type className="absolute left-3 top-2 text-emerald-700" size={20} />
        <textarea
          placeholder="Nueva descripción del grupo ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
          rows={4}
        />
      </div>

      {/* Imagen */}
      <div className="space-y-2">
        <label
          htmlFor="image"
          className="flex items-center justify-center gap-2 w-full bg-emerald-100 text-black px-4 py-2 rounded-xl cursor-pointer hover:bg-emerald-200 transition"
        >
          <ImagePlus size={20} />
          <span>Cambiar imagen del grupo</span>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 dark:text-50k rounded-xl py-2 font-semibold shadow-md hover:bg-emerald-200 transition"
      >
        Editar Grupo
      </button>
    </form>
  );
};