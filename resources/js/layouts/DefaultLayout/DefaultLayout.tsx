import { AppFooter } from "@/components/AppFooter"
import { AppNavar } from "@/components/AppNavBar"
import { Outlet } from "react-router-dom"

export const DefaultLayout = () => {
    return(
        <>
            <AppNavar />
            <Outlet />
            <AppFooter />
        </>
    )
}