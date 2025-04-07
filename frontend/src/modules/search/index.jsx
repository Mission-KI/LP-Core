import Search from "./pages/Search/Search";
import ToggleEnglishAndRedirect from "./pages/ToggleEnglishAndRedirect";
import ToggleGermanAndRedirect from "./pages/ToggleGermanAndRedirect";

const searchRoutes = [
  {
    path: '/',
    element: <Search />,
  },
  {
    path: '/en',
    element: <ToggleEnglishAndRedirect />,
  },
  {
    path: '/de',
    element: <ToggleGermanAndRedirect />,
  }
];

export default searchRoutes;