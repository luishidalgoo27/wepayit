import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { PublicRoute } from "./layouts/PublicRoute";
import { HomePage } from "@/pages/Home/HomePage";
import { RegisterPage } from "./pages/Users/RegisterPage";
import { LoginPage } from "./pages/Users/LoginPage";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { UserLayout } from "@/layouts/UserLayout";
import { GroupsPage } from "./pages/Groups/GroupsPage";
import { CreateGroupPage } from "./pages/Groups/CreateGroupPage";
import { EditProfilePage } from "./pages/Users/EditProfilePage";
import { InvitacionPage } from "./pages/Users/InvitacionPage";
import { ExpensesPage } from "./pages/Expenses/ExpensesPage";
import { GuestLayout } from "./layouts/GuestLayout";

const router = createBrowserRouter([
  // Rutas públicas
  {
    element: <PublicRoute />,
    children: [
      {
        element: <GuestLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/register",element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> },
        ]
      }
    ]
  },

  // Rutas protegidas con layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <UserLayout />, 
        errorElement: <ErrorPage />,
        children: [
          { path: "/groups", element: <GroupsPage /> },
          { path: "/groups/create-group", element: <CreateGroupPage /> },
          { path: "/expenses", element: <ExpensesPage /> },
          { path: "/user/edit-profile", element: <EditProfilePage /> },
          { path: "/invitation", element: <InvitacionPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
