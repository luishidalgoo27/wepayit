import { Link } from "react-router-dom"

export const GroupsPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#00110F] to-[#164236] flex justify-center py-10   mx-auto p-4">
            <div className="w-11/12 max-w-md space-y-4">
                <Link to="/gastos" className="bg-[#D5F3EA] text-black rounded-xl flex  p-4 w-xl  shadow-md">
                    <div>
                        <h2 className="font-semibold">Vacaciones mallorca</h2>
                        <p className="text-sm">Grupo para el viaje a mallorca</p>
                    </div>
                </Link>

                <Link to="/gastos" className="bg-[#D5F3EA] text-black rounded-xl flex items-center p-4 w-xl shadow-md">

                    <div>
                        <h2 className="font-semibold">Comida familiar</h2>
                        <p className="text-sm">Grupo para la comida en familia</p>
                    </div>
                </Link>

                <Link to="/gastos" className="bg-[#D5F3EA] text-black rounded-xl flex items-center p-4 w-xl shadow-md">

                    <div>
                        <h2 className="font-semibold">Piso de estudiantes</h2>
                        <p className="text-sm">Grupo para gestionar los gastos del piso</p>
                    </div>
                </Link>

                <Link to="/crearGrupo" className="block text-center bg-[#D5F3EA] text-black hover:bg-[#b9e6d8] rounded-xl py-3 mt-2 w-xl  shadow-md font-semibold transition">
                    + Crear nuevo grupo
                </Link>
            </div>
        </main>
    )
}
