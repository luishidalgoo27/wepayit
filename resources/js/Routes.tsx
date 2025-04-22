import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/Error/ErrorPage";
import HomePage from "@/pages/Home/HomePage";
import { GruposPage } from "./pages/Groups/GruposPage";
import CrearGruposPage from "./pages/Groups/CrearGruposPage";
import EditarPerfilPage from "./pages/Users/EditarPerfilPage";
import InvitacionPage from "./pages/Users/InvitacionPage";
import LoginPage from "./pages/Users/LoginPage";


const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/grupos", element: <GruposPage /> },
            { path: "/gastos", element: <HomePage /> },
            { path: "/crearGrupo", element: <CrearGruposPage /> },
            { path: "/editProfile", element: <EditarPerfilPage /> },
            { path: "/invitation", element: <InvitacionPage /> },
            { path: "/login", element: <LoginPage /> },
        ]
    }
])

export const Routes = () => {
    return <RouterProvider router={router} />
}