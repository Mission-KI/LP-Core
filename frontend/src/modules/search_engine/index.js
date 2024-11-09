import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Search from "./pages/SearchEngine/Search";

const searchEngineRoutes = [
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/bookmarks',
    element: <Bookmarks />,
  },
];

export default searchEngineRoutes;