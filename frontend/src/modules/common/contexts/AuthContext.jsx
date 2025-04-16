import React, {
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
      setToken(response.access);
      localStorage.setItem("accessToken", response.access);
      navigate("/monitoring/dashboard");
      return { success: true };
    } else {
      return { success: false, message: response.message || "Login failed" };
    }
  };

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    setUsername("");
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
    [handleLogout]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      checkTokenExpiration(storedToken);
      setUsername(jwtDecode(storedToken).username);
      setAuthenticated(true);
      setToken(storedToken);
    }
    setLoading(false);
  }, [checkTokenExpiration]);

  const value = {
    authenticated,
    username,
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
