import AcceptablePolicy from "./pages/AcceptablePolicy";
import Imprint from "./pages/Imprint";
import Policy from "./pages/Policy";

const legalRoutes = [
  {
    path: '/imprint',
    element: <Imprint />,
  },
  {
    path: '/acceptable-use-policy',
    element: <AcceptablePolicy />,
  },
  {
    path: '/data-privacy-policy',
    element: <Policy />,
  },
];

export default legalRoutes;