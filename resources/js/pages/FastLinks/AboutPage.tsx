export const AboutPage = () => {
    const teamMembers = [
        {
            name: "Luis Hidalgo",
            role: "Desarrollador Backend y Gestor del Proyecto",
            description: "Encargado de la lógica del servidor y supervisó el desarrollo del proyecto y la coordinación del equipo.",
            photo: "/public/luisphoto.jpg", 
        },
        {
            name: "Pedro Ángel Beltrán",
            role: "Desarrollador Frontend",
            description: "Encargado de la implementación de la interfaz de usuario y la experiencia visual.",
            photo: "/public/pedroangelphoto.jpg", 
        },
        {
            name: "Ángel Baena",
            role: "Desarrollador Backend",
            description: "Integración con la base de datos. Modelos, Migraciones",
            photo: "/public/angelphoto.jpg", 
        },
        {
            name: "Rafaél López",
            role: "Diseñador UI/UX",
            description: "Diseñó la experiencia de usuario y los prototipos visuales de la plataforma.",
            photo: "/public/rafaphoto.jpg", 
        },
    ];

    return (
        <div className="container max-w-4xl mx-auto py-8 space-y-6">
            <h1 className="text-4xl font-bold text-[var(--color-800)] dark:text-[var(--color-100)]">
                Sobre nosotros
            </h1>
            <p className="text-lg text-[var(--color-950)] dark:text-[var(--color-00)]">
                WePayIt es una plataforma diseñada para facilitar la gestión de grupos y gastos compartidos. 
                Nuestro objetivo es simplificar tu vida financiera, permitiéndote organizar tus finanzas de manera eficiente y colaborativa.
            </p>
            <p className="text-lg text-[var(--color-800)] dark:text-[var(--color-200)]">
                Creemos en la importancia de la transparencia y la colaboración, y trabajamos constantemente para ofrecerte las mejores herramientas para gestionar tus grupos.
            </p>

            {/* Tarjetas del equipo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-[var(--color-50)] dark:bg-[var(--color-900)] border border-[var(--color-200)] dark:border-[var(--color-700)] rounded-xl p-4 shadow-md flex flex-col items-center text-center"
                    >
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mb-4 border border-[var(--color-300)] dark:border-[var(--color-600)]"
                        />
                        <h3 className="text-lg font-semibold text-[var(--color-800)] dark:text-[var(--color-100)]">
                            {member.name}
                        </h3>
                        <p className="text-sm text-[var(--color-600)] dark:text-[var(--color-300)]">
                            {member.role}
                        </p>
                        <p className="text-sm text-[var(--color-800)] dark:text-[var(--color-200)] mt-2">
                            {member.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};