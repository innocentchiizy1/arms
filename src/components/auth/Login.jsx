import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the real API
      const response = await apiService.login({
        email: formData.email,
        password: formData.password,
      });

      // Store the token
      if (response.data && response.data.token) {
        localStorage.setItem("hrm_token", response.data.token);
      }

      // Store the session/user object
      if (response.data) {
        localStorage.setItem("hrm_session", JSON.stringify(response.data));
      }

      onLogin(response.data);
      setLoading(false);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>HRM Portal</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <div className="field-title">Email</div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <div className="field-title">Password</div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials: admin@company.com / password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
