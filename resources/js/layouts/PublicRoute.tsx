import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";
import { LoaderCircle } from "lucide-react";

export const PublicRoute = () => {
  const { user, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/groups" replace />;
  }

  return <Outlet />;
};
