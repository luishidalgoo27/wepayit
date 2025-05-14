import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const fadeInFromTop = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.6, // Retraso entre elementos
            },
        },
    };

    const zoomIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    const rotateOnHover = {
        whileHover: { rotate: 5, scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className="flex flex-col gap-24 py-20 px-4 sm:px-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            {/* Hero Section */}
            <motion.section
                className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl bg-[var(--color-100)] dark:bg-[var(--color-800)] rounded-3xl p-8"
                variants={fadeInFromTop}
            >
                <motion.img
                    src="/imagenprincipal.png"
                    alt="Puzzle manos"
                    className="w-full h-auto rounded-3xl"
                    variants={zoomIn}
                />
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-[var(--color-900)] dark:text-[var(--color-50)] leading-tight">
                        ¿Otra vez pagando tú por todos?
                    </h1>
                    <p className="text-xl text-[var(--color-600)] dark:text-[var(--color-200)]">
                        Tranquilo, no eres el banco del grupo.
                        Con <span className="text-[var(--color-950)] dark:text-400 font-bold">WePayIt</span> puedes dejar de perseguir a tus amigos por Bizums.
                        Divide los gastos en segundos, reparte lo que corresponde y listo. 
                        Justo, rápido y sin dramas.
                    </p>
        
                    <motion.button
                        className="clickButton mt-4 px-6 py-3 text-lg  shadow"
                        onClick={() => navigate('/register')}

                    >
                        Empieza gratis
                    </motion.button>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center shadow-xl bg-[var(--color-100)] dark:bg-[var(--color-800)] rounded-3xl p-8"
                variants={fadeInFromTop}
            >
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-[var(--color-900)] dark:text-[var(--color-50)]">
                        Divide tus gastos fácilmente
                    </h2>
                    <p className="text-lg text-[var(--color-600)] dark:text-[var(--color-200)]">
                        Comparte piso, un viaje o una cena y olvídate de las cuentas a mano.
                        Con <span className="text-[var(--color-950)] dark:text-400 font-semibold">WePayIt</span>, creas un grupo, añades los gastos y la app se encarga del resto.
                        Sin calculadora, sin discusiones y con los números bien claritos.
                    </p>
                </div>
                <motion.img
                    src="/pago-card1.webp"
                    alt="Pago con tarjeta"
                    className="w-full h-auto rounded-3xl"
                    variants={zoomIn}
                />
            </motion.section>

            {/* Benefits Section */}
            <motion.section
                className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
                variants={fadeInFromTop}
            >
                <motion.img
                    src="/movilYDinero.png"
                    alt="Dinero en el móvil"
                    className="w-full h-auto rounded-3xl"
                    variants={zoomIn}
                />

                <motion.div
                    className="rounded-2xl p-8 space-y-4 bg-[var(--color-100)] dark:bg-[var(--color-800)] shadow"
                    {...rotateOnHover}
                >
                    <h3 className="text-2xl font-bold text-[var(--color-800)] dark:text-[var(--color-50)] flex items-center gap-2">
                        ❤️ Fácil para todos
                    </h3>
                    <p className="text-[var(--color-600)] dark:text-[var(--color-200)] text-lg">
                        <span className="text-[var(--color-950)] dark:text-400 font-semibold">WePayIt</span> está pensado para que cualquier persona lo entienda.
                        Literalmente cualquiera: tu colega que siempre se pierde, tu abuela, el que nunca trae suelto...
                        Interfaz simple, pasos claros y cero complicaciones.
                    </p>
                </motion.div>

                <motion.div
                    className="rounded-2xl p-8 space-y-4 bg-[var(--color-100)] dark:bg-[var(--color-800)] shadow"
                    {...rotateOnHover}
                >
                    <h3 className="text-2xl font-bold text-[var(--color-800)] dark:text-[var(--color-50)] flex items-center gap-2">
                        💧 Transparente como el agua
                    </h3>
                    <p className="text-[var(--color-600)] dark:text-[var(--color-200)] text-lg">
                        Nada se esconde con <span className="text-[var(--color-950)] dark:text-400 font-semibold">WePayIt</span>.
                        Todos ven todos los gastos, quién debe a quién y cuánto falta por pagar.
                        Ideal para mantener la paz en el grupo... y para recordar quién fue el valiente que se gastó 20€ en gofres a las 3AM.
                    </p>
                </motion.div>

                <motion.img
                    src="/vistaGrupos.avif"
                    className="ml-0 md:ml-24 w-full md:w-80 h-auto rounded-3xl"
                    alt="Vista de grupos en la app"
                    variants={zoomIn}
                />
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                className="max-w-7xl mx-auto text-center space-y-12"
                variants={fadeInFromTop}
            >
                <h2 className="text-3xl font-bold text-[var(--color-900)] dark:text-[var(--color-50)]">
                    Lo que dicen nuestros usuarios
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        className="bg-[var(--color-100)] dark:bg-[var(--color-800)] p-6 rounded-2xl shadow"
                        variants={zoomIn}
                    >
                        <p className="text-[var(--color-950)] dark:text-[var(--color-100)]">
                            "WePayIt me ha salvado la vida en mis viajes con amigos. ¡Nunca más discusiones por dinero!"
                        </p>
                        <span className="block mt-4 text-[var(--color-500)] dark:text-300 font-semibold">- Jose Antonio García</span>
                    </motion.div>
                    <motion.div
                        className="bg-[var(--color-100)] dark:bg-[var(--color-800)] p-6 rounded-2xl shadow"
                        variants={zoomIn}
                    >
                        <p className="text-[var(--color-950)] dark:text-[var(--color-100)]">
                            "La mejor app para dividir gastos. Fácil de usar y súper clara."
                        </p>
                        <span className="block mt-4 text-[var(--color-500)] dark:text-300 font-semibold">- Amin Harou</span>
                    </motion.div>
                    <motion.div
                        className="bg-[var(--color-100)] dark:bg-[var(--color-800)] p-6 rounded-2xl shadow"
                        variants={zoomIn}
                    >
                        <p className="text-[var(--color-950)] dark:text-[var(--color-100)]">
                            "Perfecta para compartir piso. Ahora todos sabemos cuánto debemos y a quién."
                        </p>
                        <span className="block mt-4 text-[var(--color-500)] dark:text-300 font-semibold">- Enrique Flores</span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                className="bg-[var(--color-500)] dark:bg-[var(--color-700)] text-[var(--color-50)] dark:text-50 py-12 text-center rounded-2xl shadow-lg"
                variants={fadeInFromTop}
            >
                <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
                <p className="text-lg mb-6">
                    Únete a miles de usuarios que ya están simplificando sus gastos con <span className="font-semibold">WePayIt</span>.
                </p>
                <motion.button
                    className="clickButton px-6 py-3 rounded-xl text-lg font-medium shadow"
                    onClick={() => navigate('/register')}

                >
                    Regístrate gratis
                </motion.button>
            </motion.section>
        </motion.div>
    );
};
