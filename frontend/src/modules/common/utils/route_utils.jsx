import { Route } from "react-router";

export const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          index={route.index}
        />
      );
    }
  });
};
