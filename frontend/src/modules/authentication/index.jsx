import Login from './pages/Login/Login';
import Logout from './pages/Logout';
import Register from './pages/Register/Reigister';

const authRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'logout',
    element: <Logout />,
  },
];

export default authRoutes;