import { Header } from "@/components/layout/GuestLayout/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/UserLayout/Footer";
import { Toaster } from "react-hot-toast";

export const GuestLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />

            <Header />

            <main className="flex-1 flex items-center justify-center container mx-auto py-7">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};