import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../authentication/api/auth";

const AuthContext = createContext();

// Custom hook for accessing the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app and provide the auth state
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isMonitoringUser, setIsMonitoringUser] = useState(false);
  const [dataspaceName, setDataspaceName] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to log in
  const handleLogin = async (user) => {
    const response = await login(user);
    if (response.access) {
      const decodedToken = jwtDecode(response.access);
      setAuthenticated(true);
      setUsername(decodedToken.username);
      setIsSuperuser(decodedToken.is_superuser);
      setIsMonitoringUser(decodedToken.is_monitoring_user);
      setDataspaceName(decodedToken.dataspace_name);
      setToken(response.access);
      localStorage.setItem("accessToken", response.access);
      return { success: true };
    } else {
      return { success: false, message: response.message || "Login failed" };
    }
  };

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    setUsername("");
    setIsSuperuser(false);
    setIsMonitoringUser(false);
    setDataspaceName("");
    setToken("");
    localStorage.removeItem("accessToken");
    navigate("/");
  }, [navigate]);

  const checkTokenExpiration = useCallback(
    (token) => {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
    },
    [handleLogout],
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);

        // this snippet can be removed after 15 days since the old tokens will expire
        if (!decoded.is_monitoring_user && !decoded.is_superuser) {
          handleLogout();
          return;
        }

        checkTokenExpiration(storedToken);
        setUsername(decoded.username);
        setDataspaceName(decoded.dataspace_name);
        setIsSuperuser(decoded.is_superuser);
        setIsMonitoringUser(decoded.is_monitoring_user);
        setAuthenticated(true);
        setToken(storedToken);
      } catch (error) {
        handleLogout();
      }
    }
    setLoading(false);
  }, [checkTokenExpiration, handleLogout]);

  const value = {
    authenticated,
    username,
    isSuperuser,
    dataspaceName,
    isMonitoringUser,
    token,
    login: handleLogin,
    logout: handleLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
