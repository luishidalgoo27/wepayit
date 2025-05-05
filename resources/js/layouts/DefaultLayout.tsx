import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export const DefaultLayout = () => {
    return(
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}