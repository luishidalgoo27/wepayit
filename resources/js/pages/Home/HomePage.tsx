export const HomePage = () => {
    return (
        <div className="flex flex-col gap-24 py-20 px-4 sm:px-8 bg-color-50">

            <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl">
                <img
                    src="/public/imagenprincipal.png"
                    alt="Puzzle manos"
                    className="w-full h-auto rounded-3xl"
                />
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-color-900 leading-tight">
                        ¿Otra vez pagando tú por todos?
                    </h1>
                    <p className="text-xl text-color-700">
                        Tranquilo, no eres el banco del grupo.
                        Con <span className="text-color-700 font-bold">WePayIt</span> puedes dejar de perseguir a tus amigos por Bizums.
                        Divide los gastos en segundos, reparte lo que corresponde y listo. 
                        Justo, rápido y sin dramas.
                    </p>
                    <button className="mt-4 bg-color-500 dark:text-50 dark:bg-400 text-100 bg-500 px-6 py-3 rounded-xl text-lg font-medium shadow hover:bg-color-600 transition">
                        Empieza gratis
                    </button>
                </div>
            </section>

            <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl">
                <div className="space-y-6 ml-0 md:ml-9">
                    <h2 className="text-3xl font-bold text-color-900">
                        Divide tus gastos fácilmente
                    </h2>
                    <p className="text-lg text-color-700">
                        Comparte piso, un viaje o una cena y olvídate de las cuentas a mano.
                        Con <span className="text-color-500 font-semibold">WePayIt</span>, creas un grupo, añades los gastos y la app se encarga del resto.
                        Sin calculadora, sin discusiones y con los números bien claritos.
                    </p>
                </div>
                <img
                    src="/public/pago-card1.webp"
                    alt="Pago con tarjeta"
                    className="w-full h-auto rounded-3xl"
                />
            </section>

            <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <img src="/public/movilYDinero.png" alt="Dinero en el móvil" className="w-full h-auto" />

                <div className="rounded-2xl p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-color-800 flex items-center gap-2">
                        ❤️ Fácil para todos
                    </h3>
                    <p className="text-color-700 text-lg">
                        <span className="text-color-500 font-semibold">WePayIt</span> está pensado para que cualquier persona lo entienda.
                        Literalmente cualquiera: tu colega que siempre se pierde, tu abuela, el que nunca trae suelto...
                        Interfaz simple, pasos claros y cero complicaciones.
                    </p>
                </div>

                <div className="rounded-2xl p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-color-800 flex items-center gap-2 mt-8">
                        💧 Transparente como el agua
                    </h3>
                    <p className="text-color-700 text-lg">
                        Nada se esconde con <span className="text-color-500 font-semibold">WePayIt</span>.
                        Todos ven todos los gastos, quién debe a quién y cuánto falta por pagar.
                        Ideal para mantener la paz en el grupo... y para recordar quién fue el valiente que se gastó 20€ en gofres a las 3AM.
                    </p>
                </div>

                <img
                    src="/public/vistaGrupos.avif"
                    className="ml-0 md:ml-24 w-full md:w-80 h-auto"
                    alt="Vista de grupos en la app"
                />
            </section>
        </div>
    );
};
