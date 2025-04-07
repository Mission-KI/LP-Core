import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingLayout from "./modules/common/layouts/LandingLayout";
import AppLayout from "./modules/common/layouts/AppLayout";
import bcrypt from 'bcryptjs';
import searchEngineRoutes from "./modules/search_engine";
import datasetRoutes from "./modules/dataset";
import HealthCheck from './modules/search_engine/pages/HealthCheck';
import ScrollToTop from './modules/common/components/ScrollToTop';
import PageNotFound from './modules/common/pages/PageNotFound';
import authRoutes from './modules/authentication';
import bookmarkRoutes from './modules/bookmarks';
import { AuthProvider, useAuth } from './modules/common/contexts/AuthContext';
import supportRoutes from './modules/support';
import Maintenance from './modules/common/pages/Maintenance';
import helpRoutes from './modules/help';
import { ThemeProvider } from './modules/common/contexts/ThemeContext';
import { SettingsProvider } from './modules/common/contexts/SettingsContext';
import monitoringRoutes from './modules/monitoring';
import Details from './modules/dataset/pages/Details/Details';
import DetailViewLayout from './modules/dataset/layouts/DetailViewLayout';
import HelpLayout from './modules/help/layouts/HelpLayout';

// Predefined hashed password
const salt = bcrypt.genSaltSync(10);
const HASHED_PASSWORD = "$2a$10$K/Vl.BTkkYAcVdnwp4UyJ.i5mbHnZSlZygI9Zymwp15pfBRDHT68.";

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

const routes = [
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      ...searchEngineRoutes,
    ],
  },
  ...authRoutes,
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/details',
        element: <DetailViewLayout />,
        children: [
          ...datasetRoutes,
        ],
      },
      ...bookmarkRoutes,
      ...supportRoutes,
    ],
  },
  {
    path: '/',
    element: <HelpLayout />,
    children: [
      ...helpRoutes,
    ],
  },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      ...monitoringRoutes,
    ],
  },
  {
    path: '/health_check',
    element: <HealthCheck />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];


const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return <Route key={index} path={route.path} element={route.element} index={route.index} />;
    }
  });
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <ScrollToTop />
            <Routes>{renderRoutes(routes)}</Routes>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;