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
        <h1 className="mb-2 bold">Log in</h1>
        <p className="txt-lighter mb-4">Enter your user details to log in and access our private tools.</p>
        {error && <span className="text-danger small">{error}</span>} { }
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-2 ms-1">Username <span className="txt-danger">*</span></label>
            <input
              type="text"
              name="username"
              className="form-control py-3"
              placeholder="Enter your username"
            />
          </div>
          <div className="py-2">
            <label className="mb-2 ms-1">Password <span className="txt-danger">*</span></label>
            <input
              type="password"
              name="password"
              className="form-control py-3"
              placeholder="• • • • • • • •"
            />
          </div>

          <div className="py-2 mt-4">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
