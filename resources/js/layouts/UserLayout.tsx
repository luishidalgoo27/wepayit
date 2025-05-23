import { Footer } from "@/components/layout/UserLayout/Footer"
import { Header } from "@/components/layout/UserLayout/Header"
import { Toaster } from "react-hot-toast"
import { Outlet, useLocation } from "react-router-dom"
import { BackButton } from "@/components/ui/BackButton"
import { BreadCrumb } from "@/components/ui/BreadCrumb"

export const UserLayout = () => {
    const location = useLocation();

    const showBackButton = (
        location.pathname === "/groups/create-group" ||
        location.pathname === "/groups/edit-group" ||
        /^\/groups\/\d+\/create-expense$/.test(location.pathname) ||
        location.pathname === "/user/edit-profile" ||
        /^\/groups\/\d+\/edit-expense\/\d+$/.test(location.pathname)
    );

    

    return(
        <div className="flex flex-col min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />
            
            <Header />
            <div className="flex items-center justify-center">
                <BreadCrumb />
            </div>
            
            <main className="flex-1 container mx-auto">
                {showBackButton && <BackButton />}
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}