import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";

export const ProtectedRoute = () => {
  const { user, isLoading } = useGetUser();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
