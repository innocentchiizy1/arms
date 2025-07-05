import { useState } from "react";
import apiService from "../../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        role: formData.role,
      });

      // Store the token
      if (response.token) {
        localStorage.setItem("hrm_token", response.token);
      }

      // Create user object with role
      const userData = {
        id: response.user?.id || "1",
        name:
          response.user?.name ||
          `${
            formData.role === "admin"
              ? "John Doe (Admin)"
              : "Alice Nguyen (Employee)"
          }`,
        email: formData.email,
        role: formData.role,
      };

      onLogin(userData);
      setLoading(false);
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role (for testing)</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials: admin@company.com / password123</p>
          <p>Select role to test different dashboards</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
