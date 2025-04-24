import { BrowserRouter as Router, Routes } from "react-router-dom";
import LandingLayout from "./modules/common/layouts/LandingLayout";
import AppLayout from "./modules/common/layouts/AppLayout";
import searchEngineRoutes from "./modules/search";
import datasetRoutes from "./modules/dataset";
import HealthCheck from "./modules/search/pages/HealthCheck";
import ScrollToTop from "./modules/common/components/ScrollToTop";
import PageNotFound from "./modules/common/pages/PageNotFound";
import authRoutes from "./modules/authentication";
import bookmarkRoutes from "./modules/bookmarks";
import { AuthProvider } from "./modules/common/contexts/AuthContext";
import helpRoutes from "./modules/help";
import { ThemeProvider } from "./modules/common/contexts/ThemeContext";
import { SettingsProvider } from "./modules/common/contexts/SettingsContext";
import monitoringRoutes from "./modules/monitoring";
import DetailViewLayout from "./modules/dataset/layouts/DetailViewLayout";
import HelpLayout from "./modules/help/layouts/HelpLayout";
import { BookmarksProvider } from "./modules/bookmarks/contexts/BookmarksContext";
import MonitoringLayout from "./modules/monitoring/layout/MonitoringLayout";
import { PrivateRoutes } from "./modules/common/components/PrivateRoutes";
import { renderRoutes } from "./modules/common/utils/route_utils";
import AdminPanelLayout from "./modules/admin_panel/layout/AdminPanelLayout";
import adminPanelRoutes from "./modules/admin_panel";
import { AdminRoutes } from "./modules/common/components/AdminRoutes";
import { MonitoringUserRoutes } from "./modules/common/components/MonitoringUserRoutes";

const routes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [...searchEngineRoutes],
  },
  ...authRoutes,
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/details",
        element: <DetailViewLayout />,
        children: [...datasetRoutes],
      },
      ...bookmarkRoutes,
    ],
  },
  {
    path: "/",
    element: <HelpLayout />,
    children: [...helpRoutes],
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <MonitoringUserRoutes />,
        children: [
          {
            path: "/",
            element: <MonitoringLayout />,
            children: [...monitoringRoutes],
          },
        ],
      },
      {
        path: "/",
        element: <AdminRoutes />,
        children: [
          {
            path: "/",
            element: <AdminPanelLayout />,
            children: [...adminPanelRoutes],
          },
        ],
      },
    ],
  },
  {
    path: "/health_check",
    element: <HealthCheck />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

function App() {
  return (
    <Router>
      <BookmarksProvider>
        <ThemeProvider>
          <SettingsProvider>
            <AuthProvider>
              <ScrollToTop />
              <Routes>{renderRoutes(routes)}</Routes>
            </AuthProvider>
          </SettingsProvider>
        </ThemeProvider>
      </BookmarksProvider>
    </Router>
  );
}

export default App;
