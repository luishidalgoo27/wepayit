import { Footer } from "@/components/layout/UserLayout/Footer"
import { Header } from "@/components/layout/UserLayout/Header"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            {/* Botón de "Volver atrás" siempre visible */}
            <main className="flex-1 container mx-auto py-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}