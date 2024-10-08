import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from "./modules/common/layouts/LandingLayout";
import AppLayout from "./modules/common/layouts/AppLayout";
import homeRoutes from "./modules/home";
import datasetRoutes from "./modules/dataset";

const routes = [
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      ...homeRoutes
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