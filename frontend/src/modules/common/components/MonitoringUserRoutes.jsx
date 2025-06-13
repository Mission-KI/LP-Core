import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const MonitoringUserRoutes = () => {
  const { loading, isMonitoringUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isMonitoringUser) {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};
