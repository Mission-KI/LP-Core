import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Logs } from "./pages/Logs";

const adminPanelRoutes = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/logs",
    element: <Logs />,
  },
];

export default adminPanelRoutes;
