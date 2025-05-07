export const HomePage = () => {
    return (
        <div className="flex flex-col gap-6 py-12">
            {/* Sección 1 */}
            <section className="max-w-4xl mx-auto grid md:grid-cols-2 items-center gap-8  p-6 rounded-2xl shadow-lg">
                <img
                    src="/public/movilYDinero.png"
                    alt="Puzzle manos"
                    className="w-96  mx-auto md:mx-0"
                />
                <div>
                    <h2 className="text-3xl font-bold text-yellow-300 mb-4">¿Otra vez pagando tú por todos?</h2>
                    <p className="text-lg text-gray-300">
                        Tranquilo, no eres el banco del grupo. <br />
                        Con <span className="text-yellow-400 font-semibold">WePayIt</span>, divides gastos en segundos y todos pagan su parte.
                    </p>
                </div>
            </section>

            {/* Sección 2 */}
            <section className="max-w-4xl mx-auto grid md:grid-cols-2 items-center gap-8  p-6 rounded-2xl shadow-lg">
                <img
                    src="/public/pago-card1.webp"
                    alt="Pago con tarjeta"
                    className="w-full md:w-60 rounded-xl  mx-auto md:mx-0"
                />
                <div>
                    <h2 className="text-2xl font-extrabold uppercase text-yellow-300 mb-4">
                        Divide tus gastos fácilmente
                    </h2>
                    <p className="text-lg text-gray-300">
                        Crea un grupo, añade los gastos y ve quién debe a quién. <br />
                        Todo claro, sin cálculos raros ni discusiones.
                    </p>
                </div>
            </section>

            {/* Sección 3 */}
            <section className="max-w-4xl mx-auto  p-6 rounded-2xl shadow-md space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-yellow-400">❤️ Fácil para todos</h3>
                    <p className="text-gray-300">
                        Diseñado para abuelos, amigos despistados y hasta ese colega que nunca entiende nada.
                        Literalmente cualquiera puede usarlo.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-yellow-400">💧 Transparente como el agua</h3>
                    <p className="text-gray-300">
                        Todos ven todo. Lo bueno, lo malo y lo que se gastó en churros a las 3AM.
                    </p>
                </div>
            </section>
        </div>
    );
};
