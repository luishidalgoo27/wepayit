import { Link } from "react-router-dom"

export const GruposPage = () => {
    return (
        <main className="container mx-auto p-4">
            <div className="px-4 space-y-4 mt-6">
                <Link to="/gastos" className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">Vacaciones mallorca</h2>
                        <p className="text-sm">Grupo para el viaje a mallorca</p>
                    </div>
                </Link>

                <Link to="/gastos" className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">Comida familiar</h2>
                        <p className="text-sm">Grupo para la comida en familia</p>
                    </div>
                </Link>

                <Link to="/gastos" className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">Piso de estudiantes</h2>
                        <p className="text-sm">Grupo para gestionar los gastos del piso</p>
                    </div>
                </Link>

                <Link to='/crearGrupo' className="bg-emerald-100 text-black hover:bg-emerald-200 rounded-xl py-2 mt-2 shadow-md">
                    + Crear nuevo grupo
                </Link>
            </div>
        </main>
    )
}