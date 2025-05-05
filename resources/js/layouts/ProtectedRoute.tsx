import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";

export const ProtectedRoute = () => {
  const { user } = useGetUser();

  if (!user) {
    console.log("Usuario no encontrado, redirigiendo");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
