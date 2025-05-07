
import { Header } from "@/components/layout/GuestLayout/Header"
import { Outlet } from "react-router-dom"

export const GuestLayout = () => {
    return(
        <div className="flex flex-col min-h-screen">  
            <Header />
            <main className="flex-1 container mx-auto py-4">
                <Outlet />
            </main>    
        </div>
    )
}