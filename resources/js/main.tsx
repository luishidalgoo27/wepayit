import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";


const AppLayout = () => {
    return(
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
        ]
    }
])

createRoot(document.getElementById('root')!).render( 
    <RouterProvider router={router} />
)