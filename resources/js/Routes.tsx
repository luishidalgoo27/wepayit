import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { HomePage } from "@/pages/Home/HomePage";
import { GruposPage } from "./pages/Groups/GruposPage";
import { CrearGruposPage } from "./pages/Groups/CrearGruposPage";
import { EditarPerfilPage } from "./pages/Users/EditarPerfilPage";
import { InvitacionPage } from "./pages/Users/InvitacionPage";
import { LoginPage } from "./pages/Users/LoginPage";
import { GastosPage } from "./pages/Gastos/GastosPage";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";

const router = createBrowserRouter([
  // Ruta pública sin layout
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },

  // Rutas protegidas con layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DefaultLayout />, 
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/grupos", element: <GruposPage /> },
          { path: "/crearGrupo", element: <CrearGruposPage /> },
          { path: "/gastos", element: <GastosPage /> },
          { path: "/editProfile", element: <EditarPerfilPage /> },
          { path: "/invitation", element: <InvitacionPage /> },
        ],
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
