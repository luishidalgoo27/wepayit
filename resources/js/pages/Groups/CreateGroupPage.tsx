import { createGroup } from "@/services/groups";
import { ImagePlus, FolderKanban, BadgeEuro, Type } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export const CreateGroupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currencies, setCurrencies] = useState([
    { code: "EUR", name: "Euro (€)" },
    { code: "USD", name: "Dólar ($)" },
    { code: "GBP", name: "Libra (£)" },
    { code: "JPY", name: "Yen (¥)" },
  ]);
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleShowMoreCurrencies = async () => {
    setUploading(true);
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
    } finally {
      setUploading(false);
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
    setUploading(true);
    try {
      const group = await createGroup(name, currency, description, image);
      toast.success("Grupo creado correctamente");
      navigate(`/groups/${group.id}/management`);
    } catch (err: any) {
      const errors = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat()
        : [err.response?.data?.message || "Error desconocido. Inténtalo de nuevo."];

      errors.forEach((message: string) => toast.error(message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4">
      <div className="relative w-full max-w-xl">
        <LoadingOverlay show={uploading} message="Creando Grupo..."/>
        

        <form
          onSubmit={handleSubmit}
          className="w-full py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
        >
          <h1 className="text-center text-3xl font-bold mb-4">Crear nuevo grupo</h1>

          {/* Nombre del grupo */}
          <div className="relative">
            <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
            <input
              type="text"
              required
              placeholder="Nombre del grupo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          {/* Moneda */}
          <div className="relative">
            <BadgeEuro className="absolute left-3 top-2 text-emerald-700" size={20} />
            <select
              required
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

          {/* Descripción */}
          <div className="relative">
            <Type className="absolute left-3 top-2 text-emerald-700" size={20} />
            <textarea
              placeholder="Descripción del grupo ..."
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
              <span>Subir imagen del grupo</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-emerald-100 text-black rounded-xl py-2 font-semibold shadow-md hover:bg-emerald-200 transition"
          >
            Crear Grupo
          </button>
        </form>
      </div>
    </div>
  );
};
