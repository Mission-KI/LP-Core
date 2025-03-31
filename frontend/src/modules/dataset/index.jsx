import Dataset from "./pages/Dataset/Dataset";
import Details from "./pages/Details/Details";

const datasetRoutes = [
  {
    path: '/details/:id',
    element: <Details />,
  },
  {
    path: '/details/:id/:dataset_name',
    element: <Dataset />,
  },
];

export default datasetRoutes;