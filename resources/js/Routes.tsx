import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/Error/ErrorPage";
import HomePage from "@/pages/Home/HomePage";
import { GruposPage } from "./pages/Grupos/GruposPage";


const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/grupos", element: <GruposPage /> },
            { path: "/gastos", element: <HomePage /> },
        ]
    }
])

export const Routes = () => {
    return <RouterProvider router={router} />
}