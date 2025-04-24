export const CrearGruposPage = () => {
    return (
        <main className="container mx-auto p-4">

            <div className="flex flex-col items-center ">

                <div className="w-full max-w-md space-y-3">
                    <h1 className="text-center text-2xl">Crear Grupo</h1>
                    <input type="text" placeholder="Nombre" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <select name="" id="" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" > 
                        <option value="">Euro</option>
                        <option value="">Dolar</option>
                        <option value="">Libra</option>
                        <option value="">Peseta</option>
                    </select>
                    <input type="file" id="fotoGrupo" className="bg-emerald-100"/>
                    <button className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200">
                        Crear Grupo
                    </button>
                </div>
            </div>
        </main>
    )
}