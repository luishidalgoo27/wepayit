import { Header } from "@/components/layout/GuestLayout/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/UserLayout/Footer";
import { Toaster } from "react-hot-toast";

export const InvitacionLayout = () => {
    return (
        <main className="flex-1 flex items-center justify-center container mx-auto py-7">
            <Outlet />
        </main>
    )
}


export default InvitacionLayout;