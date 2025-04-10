import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";

const monitoringRoutes = [
  {
    path: "/monitoring",
    element: <Navigate to="/monitoring/dashboard" />,
  },
  {
    path: "/monitoring/dashboard",
    element: <Dashboard />,
  },
];

export default monitoringRoutes;
