import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";

const homeRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/categories/mobility-and-transport',
    element: <Category />,
  },
];

export default homeRoutes;