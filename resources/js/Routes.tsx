import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/Error/ErrorPage";
import HomePage from "@/pages/Home/HomePage";


const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
        ]
    }
])

export const Routes = () => {
    return <RouterProvider router={router} />
}