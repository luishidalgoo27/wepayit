import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "../css/app.css"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

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

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);