
import { Header } from "@/components/layout/GuestLayout/Header"
import { Outlet } from "react-router-dom"

export const GuestLayout = () => {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}