import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from "./modules/common/layouts/LandingLayout";
import AppLayout from "./modules/common/layouts/AppLayout";
import searchEngineRoutes from "./modules/search_engine";
import datasetRoutes from "./modules/dataset";
import legalRoutes from './modules/legal';
import LegalLayout from './modules/common/layouts/LegalLayout';
import HealthCheck from './modules/search_engine/pages/HealthCheck';
import ScrollToTop from './modules/common/components/ScrollToTop';
import PageNotFound from './modules/common/pages/PageNotFound';
import authRoutes from './modules/authentication';
import bookmarkRoutes from './modules/bookmarks';
import { AuthProvider } from './modules/common/contexts/AuthContext';
import supportRoutes from './modules/support';

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
      ...datasetRoutes,
      ...bookmarkRoutes,
      ...supportRoutes
    ],
  },
  {
    path: '/',
    element: <LegalLayout />,
    children: [
      ...legalRoutes
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
      <AuthProvider>
        <ScrollToTop />
        <Routes>{renderRoutes(routes)}</Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;