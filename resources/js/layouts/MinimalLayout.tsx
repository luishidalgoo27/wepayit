import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/UserLayout/Footer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackButton } from "@/components/ui/BackButton";

export const MinimalLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <BackButton />

            <main className="flex-1 container mx-auto py-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};