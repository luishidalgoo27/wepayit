export const HomePage = () => {
    return (
        <div className="flex flex-col gap-24 py-20 px-4 sm:px-8 bg-color-50">

            <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl">
                <img
                    src="/public/imagenprincipal.png"
                    alt="Puzzle manos"
                    className="w-full h-auto rounded-3xl "
                />
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-color-900 leading-tight">
                        ¿Otra vez pagando tú por todos?
                    </h1>
                    <p className="text-xl text-color-700">
                        Tranquilo, no eres el banco del grupo.
                        Con <span className="text-color-500 font-semibold">WePayIt</span>, divides gastos en segundos y todos pagan su parte.
                    </p>
                    <button className="mt-4 bg-color-500 dark:text-100 dark:bg-400 text-100 bg-500 px-6 py-3 rounded-xl text-lg font-medium shadow hover:bg-color-600 transition">
                        Empieza gratis
                    </button>
                </div>
            </section>


            <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl">
                <div className="space-y-6 ml-9">
                    <h2 className="text-3xl font-bold text-color-900 ">
                        Divide tus gastos fácilmente
                    </h2>
                    <p className="text-lg text-color-700">
                        Crea un grupo, añade los gastos y ve quién debe a quién. Todo claro, sin cálculos raros ni discusiones.
                    </p>
                </div>
                <img
                    src="/public/pago-card1.webp"
                    alt="Pago con tarjeta"
                    className="w-full h-auto rounded-3xl "
                />
            </section>

            <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <img src="/public/movilYDinero.png" alt="" />
                
                <div className=" rounded-2xl p-8 space-y-4 ">
                    <h3 className="text-2xl font-bold text-color-800 flex items-center gap-2">
                        ❤️ Fácil para todos
                    </h3>
                    <p className="text-color-700 text-lg">
                        Diseñado para abuelos, amigos despistados y hasta ese colega que nunca entiende nada.
                        Literalmente cualquiera puede usarlo.
                    </p>
                </div>

                <div className=" rounded-2xl p-8 space-y-4  ">
                    <h3 className="text-2xl font-bold text-color-800 flex items-center gap-2 mt-8">
                        💧 Transparente como el agua
                    </h3>
                    <p className="text-color-700 text-lg">
                        Todos ven todo. Lo bueno, lo malo y lo que se gastó en churros a las 3AM.
                    </p>
                </div>

                <img src="/public/vistaGrupos.avif" className="ml-24 w-80" alt="" />
            </section> 
        </div>
    );
};
