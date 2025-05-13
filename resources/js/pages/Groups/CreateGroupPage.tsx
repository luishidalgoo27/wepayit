import { createGroup } from "@/services/groups";
import { ImagePlus, FolderKanban, BadgeEuro, Type } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateGroupPage = () => {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createGroup(name, currency, description, image);
      toast.success("Grupo creado correctamente");
      // Limpiar campos si quieres
      setName("");
      setCurrency("");
      setDescription("");
      setImage(null);
    } catch (err: any) {
      const message = err.message || "Error desconocido";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-xl mx-auto py-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-24"
    >
      <h1 className="text-center text-3xl font-bold mb-4">Crear nuevo grupo</h1>

      {/* Nombre del grupo */}
      <div className="relative">
        <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
        <input
          type="text"
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
  );
};