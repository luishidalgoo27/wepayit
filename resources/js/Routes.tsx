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
import { BalancesPage } from "@/pages/Groups/Balances/BalancesPage";
import { ManagementPage } from "@/pages/Groups/Management/ManagmentPage";
import { CreateExpensePage } from "@/pages/Groups/Expenses/CreateExpense";
import { EditProfilePage } from "@/pages/Users/EditProfilePage";
import { InvitacionPage } from "@/pages/Users/InvitacionPage";
import { GroupLayout, loader as GroupLoader } from "./layouts/GroupLayout";
import { AboutPage } from "@/pages/FastLinks/AboutPage";
import { TermsPage } from "@/pages/FastLinks/TermsPage";
import { GamesPage } from "@/pages/Groups/Games/GamesPage";
import { MinimalLayout } from "@/layouts/MinimalLayout";
import { InvitacionLayout } from "@/layouts/InvitacionLayout";
import { EditGroupPage } from "./pages/Groups/EditGroupPage";
import { EditExpensePage, loader as EditExpenseLoader } from "./pages/Groups/Expenses/EditExpensesPage";

const router = createBrowserRouter([
  /* Layout sin header ni footer */
  {
    element: <MinimalLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/about", element: <AboutPage /> },
      { path: "/terms", element: <TermsPage /> },
    ],
  },

  /* Layout sin header ni footer */
  {
    element: <InvitacionLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/invitation/:code", element: <InvitacionPage /> },
    ],
  },

  /* Rutas publicas */
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
        ],
      },
    ],
  },

  /* Rutas privadas */
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "/groups", element: <GroupsPage /> },
          { path: "/groups/create-group", element: <CreateGroupPage /> },
          { path: "/groups/edit-group", element: <EditGroupPage /> },

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
                path: "games",
                element: <GamesPage />,
                loader: GroupLoader,
              },
              {
                path: "management",
                element: <ManagementPage />,
                loader: GroupLoader,
              },
            ],
          },
          {
            path: "/groups/:id/create-expense",
            element: <CreateExpensePage />,
            loader: GroupLoader,
          },
          {
            path: "/groups/:id/edit-expense/:expenseId",
            element: <EditExpensePage />,
            loader: EditExpenseLoader,
          },
          { path: "/user/edit-profile", element: <EditProfilePage /> },
          { path: "/invitations/accept/:code", element: <InvitacionPage /> },

        ],
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
