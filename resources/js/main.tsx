import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout/DefaultLayout";
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

createRoot(document.getElementById('root')!).render( 
    <RouterProvider router={router} />
)