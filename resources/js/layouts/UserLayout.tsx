import { Footer } from "@/components/layout/UserLayout/Footer"
import { Header } from "@/components/layout/UserLayout/Header"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    return(
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}