export const HomePage = () => {
    return (
        <main className="bg-gradient-to-b from-[#00110F] to-[#164236]  text-white py-12 px-6 flex flex-col gap-16 items-center min-h-screen">
            <div className="max-w-3xl text-center flex flex-col items-center gap-6">
                <img src="/public/movilYDinero.png" alt="Puzzle manos" className="w-32" />
                <div>
                    <h2 className="text-2xl font-bold mb-2">¿Otra vez pagando tú por todos?</h2>
                    <p className="text-base text-gray-300">
                        Tranquilo, no eres el banco del grupo. <br />
                        Con WePayIt, divides gastos en segundos y todos pagan su parte.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl text-center flex flex-col items-center gap-6">
                <img src="/public/pago-card1.webp" alt="Pago con tarjeta" className="w-32 rounded-xl shadow-lg" />
                <div>
                    <h2 className="text-xl font-extrabold text-white mb-2 uppercase">
                        Divide tus gastos fácilmente con tus familiares y amigos
                    </h2>
                    <p className="text-base text-gray-300">
                        Crea un grupo, añade los gastos y ve quién debe a quién. <br />
                        Todo claro, sin cálculos raros ni discusiones.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl text-left flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-yellow-400">❤️ Fácil para todos</h3>
                <p className="text-base text-gray-300">
                    Diseñado para abuelos, amigos despistados y hasta ese colega que nunca entiende nada.
                    Literalmente cualquiera puede usarlo.
                </p>
                <h3 className="text-lg font-semibold text-yellow-400 mt-4">💧 Transparente como el agua</h3>
                <p className="text-base text-gray-300">
                    Todos ven todo. Lo bueno, lo malo y lo que se gastó en churros a las 3AM.
                </p>
            </div>
        </main>
    )
}
