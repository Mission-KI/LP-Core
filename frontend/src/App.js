import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from "./modules/common/layouts/LandingLayout";
import AppLayout from "./modules/common/layouts/AppLayout";
import searchEngineRoutes from "./modules/search_engine";
import datasetRoutes from "./modules/dataset";
import legalRoutes from './modules/legal';

const routes = [
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      ...searchEngineRoutes
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...datasetRoutes
    ],
  },
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      ...legalRoutes
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
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
      <Routes>{renderRoutes(routes)}</Routes>
    </Router>
  );
}

export default App;