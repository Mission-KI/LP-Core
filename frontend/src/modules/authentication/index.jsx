import Login from "./pages/Login/Login";
import Logout from "./pages/Logout";

const authRoutes = [
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/logout",
    element: <Logout />,
  },
];

export default authRoutes;
