export const Footer = () => {
    return (
        <footer className="bg-footer-light dark:bg-footer-dark dark:text-100 text-black pt-4 pb-2 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sección 1: Logo */}
                <div className="text-center md:text-left">
                    <img
                        src="/public/wepayitlightlogo.png" // Cambia esta ruta al logo real
                        alt="WePayIt Logo"
                        className="w-22 mx-auto md:mx-0"
                    />
                </div>

                {/* Sección 2: Enlaces rápidos */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Enlaces rápidos</h3>
                    <ul className="space-y-1">
                        <li>
                            <a href="/about" className="hover:text-accent transition">Sobre nosotros</a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:text-accent transition">Términos y condiciones</a>
                        </li>
                    </ul>
                </div>

                {/* Sección 3: Redes sociales */}
                <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold mb-2 flex flex-col items-center md:items-end">
                        <span>Síguenos</span>
                        <a href="https://getallmylinks.com/wepayit" target="_blank" rel="noopener noreferrer" className="mt-1 hover:opacity-80 transition">
                            <img
                                src="https://img.icons8.com/?size=512&id=44907&format=png"
                                alt="Instagram"
                                className="w-10 h-10 inline-block dark:invert"
                            />
                        </a>
                    </h3>
                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-[var(--color-950)] dark:border-[var(--color-700)] mt-4 pt-2">
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} WePayIt. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};