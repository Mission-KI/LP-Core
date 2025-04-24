import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Logs } from "./pages/Logs";

const monitoringRoutes = [
  {
    path: "/monitoring",
    element: <Navigate to="/monitoring/dashboard" />,
  },
  {
    path: "/monitoring/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/monitoring/logs",
    element: <Logs />,
  },
];

export default monitoringRoutes;
