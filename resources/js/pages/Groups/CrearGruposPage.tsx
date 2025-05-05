export const CrearGruposPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#00110F] to-[#11443C] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md space-y-4">
                <h1 className="text-center text-2xl text-white font-semibold">Crear Grupo</h1>
                
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" 
                />

                <select 
                    className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none"
                > 
                    <option value="">Euro</option>
                    <option value="">Dólar</option>
                    <option value="">Libra</option>
                    <option value="">Peseta</option>
                </select>

                <input 
                    type="file" 
                    id="fotoGrupo" 
                    className="w-full bg-emerald-100 text-black px-4 py-2 rounded cursor-pointer"
                />

                <button 
                    className="w-full bg-emerald-100 text-black rounded-xl py-2 shadow-md hover:bg-emerald-200 font-semibold"
                >
                    Crear Grupo
                </button>
            </div>
        </main>
    )
}
