import About from "./pages/About";
import DataFormatsAndAnalysis from "./pages/DataFormatsAndAnalysis";
import Functions from "./pages/Functions";
import Help from "./pages/Help";
import MotivationAndBasics from "./pages/MotivationAndBasics";

const helpRoutes = [
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/help/about",
    element: <About />,
  },
  {
    path: "/help/data-formats-and-analysis",
    element: <DataFormatsAndAnalysis />,
  },
  {
    path: "/help/functions",
    element: <Functions />,
  },
  {
    path: "/help/motivation-and-basics",
    element: <MotivationAndBasics />,
  },
];

export default helpRoutes;
