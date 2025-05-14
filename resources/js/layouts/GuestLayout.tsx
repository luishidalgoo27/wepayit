import { Header } from "@/components/layout/GuestLayout/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/UserLayout/Footer";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackButton } from "@/components/ui/BackButton"; // Importar el botón de "Volver atrás"

export const GuestLayout = () => {
    const location = useLocation();

    // Ocultar el Header en las rutas "/about" y "/terms"
    const hideHeader = ["/about", "/terms"].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Botón de alternancia de tema siempre visible */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Botón de "Volver atrás" siempre visible */}
            <BackButton />

            {/* Renderizar el Header solo si no estamos en "/about" o "/terms" */}
            {!hideHeader && <Header />}

            <main className="flex-1 container mx-auto py-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};