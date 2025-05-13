import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { PublicRoute } from "@/layouts/PublicRoute";
import { GuestLayout } from "@/layouts/GuestLayout";
import { HomePage } from "@/pages/Home/HomePage";
import { RegisterPage } from "@/pages/Users/RegisterPage";
import { LoginPage } from "@/pages/Users/LoginPage";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { UserLayout } from "@/layouts/UserLayout";
import { GroupsPage } from "@/pages/Groups/GroupsPage";
import { CreateGroupPage } from "@/pages/Groups/CreateGroupPage";
import { ExpensesPage } from "@/pages/Groups/Expenses/ExpensesPage";
import { BalancesPage } from "./pages/Groups/Balances/BalancesPage";
import { PhotosPage } from "./pages/Groups/Photos/PhotosPage";
import { CreateExpensePage, loader as CreateExpenseLoader } from "@/pages/Groups/Expenses/CreateExpense";
import { EditProfilePage } from "@/pages/Users/EditProfilePage";
import { InvitacionPage } from "@/pages/Users/InvitacionPage";
import { GroupLayout, loader as GroupLoader } from "./layouts/GroupLayout";

const router = createBrowserRouter([
  // Rutas públicas
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> },
        ]
      }
    ]
  },

  // Rutas protegidas con layout
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "/groups", element: <GroupsPage /> },
          { path: "/groups/create-group", element: <CreateGroupPage /> },
          {
            path: "/groups/:id",
            element: <GroupLayout />,
            loader: GroupLoader, 
            children: [
              {
                path: "expenses",
                element: <ExpensesPage />,
                loader: GroupLoader, 
              },
              {
                path: "balances",
                element: <BalancesPage />,
                loader: GroupLoader,
              },
              {
                path: "photos",
                element: <PhotosPage />,
                loader: GroupLoader,
              },
            ],
          },
          {
            path: "/groups/:id/create-expense",
            element: <CreateExpensePage />,
            loader: CreateExpenseLoader,
          },
          { path: "/user/edit-profile", element: <EditProfilePage /> },
          { path: "/invitation", element: <InvitacionPage /> },
        ],
      },
    ],
  },
  /*   { path: "*", element: <Navigate to="/" replace /> }, */
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
