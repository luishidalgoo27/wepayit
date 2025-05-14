export const Footer = () => {
    return (
        <footer className="bg-footer-light dark:bg-footer-dark dark:text-100 text-black pt-4 pb-2 px-6">
            {/* Línea divisoria */}
            <div className="border-[var(--color-950)] dark:border-[var(--color-700)]">
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} WePayIt. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};