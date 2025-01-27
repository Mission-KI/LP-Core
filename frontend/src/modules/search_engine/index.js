import Search from "./pages/SearchEngine/Search";
import ToggleEnglishAndRedirect from "./pages/ToggleEnglishAndRedirect";
import ToggleGermanAndRedirect from "./pages/ToggleGermanAndRedirect";

const searchEngineRoutes = [
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

export default searchEngineRoutes;