import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../common/contexts/AuthContext";
import Button from "../../../common/components/Button";
import styles from "./Login.module.css";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.target);
    const user = Object.fromEntries(data.entries());

    const response = await login(user);
    if (response.success) {
      toast.success("Successfully logged in!");
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div style={{ maxWidth: 470 }} className="w-100">
        <h2 className="mb-4 bold">Log in</h2>
        {error && <span className="text-danger small">{error}</span>} { }
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="form-control py-3"
              placeholder="Enter your username"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control py-3"
              placeholder="••••••••"
            />
          </div>

          <div className="py-2 mt-3">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
