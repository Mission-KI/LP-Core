import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const AdminRoutes = () => {
  const { loading, isSuperuser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isSuperuser) {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};
