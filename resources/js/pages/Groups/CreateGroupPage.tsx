import { ImagePlus, FolderKanban, BadgeEuro } from "lucide-react";

export const CreateGroupPage = () => {
  return (
    <main className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6 border border-white/20">
        <h1 className="text-center text-3xl font-bold text-white mb-4">Crear nuevo grupo</h1>

        {/* Nombre del grupo */}
        <div className="relative">
          <FolderKanban className="absolute left-3 top-3 text-emerald-700" size={20} />
          <input
            type="text"
            placeholder="Nombre del grupo"
            className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
          />
        </div>

        {/* Moneda */}
        <div className="relative">
          <BadgeEuro className="absolute left-3 top-2 text-emerald-700" size={20} />
          <select className="w-full pl-10 bg-emerald-100 text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition">
            <option value="euro">Euro</option>
            <option value="dolar">Dólar</option>
            <option value="libra">Libra</option>
            <option value="peseta">Peseta</option>
          </select>
        </div>

        {/* Imagen */}
        <div className="space-y-2">
          <label
            htmlFor="fotoGrupo"
            className="flex items-center justify-center gap-2 w-full bg-emerald-100 text-black px-4 py-2 rounded-xl cursor-pointer hover:bg-emerald-200 transition"
          >
            <ImagePlus size={20} />
            <span>Subir imagen del grupo</span>
          </label>
          <input
            type="file"
            id="fotoGrupo"
            className="hidden"
          />
        </div>

        {/* Botón */}
        <button
          className="w-full bg-emerald-100 text-black rounded-xl py-2 font-semibold shadow-md hover:bg-emerald-200 transition"
        >
          Crear Grupo
        </button>
      </div>
    </main>
  );
};
