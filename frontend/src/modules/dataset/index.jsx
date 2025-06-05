import Dataset from "./pages/Dataset/Dataset";
import Details from "./pages/Details/Details";
import FindSimilar from "./pages/FindSimilar";

const datasetRoutes = [
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/details/:id/:datasetRef",
    element: <Dataset />,
  },
  {
    path: "/details/:id/find-similar",
    element: <FindSimilar />,
  },
];

export default datasetRoutes;
