import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};
