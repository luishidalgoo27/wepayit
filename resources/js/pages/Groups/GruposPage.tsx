export const GruposPage = () => {
    return(
        <main className="container mx-auto p-4">
            <div className="px-4 space-y-4 mt-6">
                <div className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">PK2</h2>
                        <p className="text-sm">Pedro Ángel te debe 40€</p>
                    </div>
                </div>

                <div className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">PK2</h2>
                        <p className="text-sm">Pedro Ángel te debe 40€</p>
                    </div>
                </div>

                <div className="bg-emerald-100 text-black rounded-xl flex items-center p-4 space-x-4 shadow-md">

                    <div>
                        <h2 className="font-semibold">PK2</h2>
                        <p className="text-sm">Pedro Ángel te debe 40€</p>
                    </div>
                </div>

                <button className="w-full bg-emerald-100 text-black rounded-xl py-2 mt-2 shadow-md hover:bg-emerald-200">
                    + Añadir gasto
                </button>
            </div>
        </main>
    )
}