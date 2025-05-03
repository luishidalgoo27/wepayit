export const EditarPerfilPage = () => {
    return (
        <main className="bg-gradient-to-b from-[#00110F] to-[#164236]   mx-auto p-4">

            <div className="flex flex-col items-center ">

                <h2 className="text-lg text-gray-400 font-bold mt-4 text-center">RAFAEL LÓPEZ GÓMEZ</h2>
                <p className="text-sm text-gray-200 mb-6">rafa@gmail.com</p>

                <div className="w-full max-w-md space-y-3">
                    <input type="text" placeholder="Editar nombre" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <input type="text" placeholder="Editar apellidos" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <input type="text" placeholder="Editar calle" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <input type="text" placeholder="Editar" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <input type="text" placeholder="Editar" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <input type="text" placeholder="Editar" className="w-full bg-emerald-100 text-black px-4 py-2 rounded focus:outline-none" />
                    <button className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200">
                        Editar
                    </button>
                </div>
            </div>
        </main>
    );
}
