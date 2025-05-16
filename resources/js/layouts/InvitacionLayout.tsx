import { Outlet } from "react-router-dom";


export const InvitacionLayout = () => {
    return (
        <main className="flex-1 flex items-center justify-center container mx-auto py-7">
            <Outlet />
        </main>
    )
}


export default InvitacionLayout;