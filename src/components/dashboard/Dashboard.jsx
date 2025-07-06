import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../../services/api";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    onLeave: 0,
    newHires: 0,
    projects: 0,
    pendingRequests: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addEmployeeStatus, setAddEmployeeStatus] = useState("");

  // Example minimal employee payload
  const exampleEmployee = {
    firstName: "Abolaji Ade-Ajayi",
    lastName: "Ade-Ajayi",
    email: "abolajiadeajayi@example.com",
    staffId: "240316",
    employmentType: "full_time",
    hireDate: "2023-03-01",
    employmentDetails: {
      employmentType: "full_time",
      employmentStatus: "active",
      hireDate: "2023-03-01",
      salary: 950800,
      currency: "USD",
    },
  };

  const handleAddEmployee = async () => {
    setAddEmployeeStatus("");
    try {
      await apiService.createEmployee(exampleEmployee);
      setAddEmployeeStatus("Employee added successfully!");
    } catch (err) {
      setAddEmployeeStatus(
        "Failed to add employee: " + (err.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");

        // Fallback to mock data if API fails
        if (user?.role === "admin" || user?.role === "hr") {
          setStats({
            totalEmployees: 150,
            activeEmployees: 142,
            onLeave: 8,
            newHires: 5,
            projects: 12,
            pendingRequests: 23,
          });
        } else {
          setStats({
            totalEmployees: 150,
            activeEmployees: 142,
            onLeave: 8,
            newHires: 5,
            projects: 3,
            pendingRequests: 2,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.role]);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{loading ? "..." : value}</p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="activity-item">
      <div className="activity-icon">
        {activity.type === "leave_request" && "📅"}
        {activity.type === "new_employee" && "👤"}
        {activity.type === "attendance" && "⏰"}
        {activity.type === "payroll" && "💰"}
        {activity.type === "performance" && "📈"}
      </div>
      <div className="activity-content">
        <p>{activity.message}</p>
        <span>{activity.time}</span>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome to your HR Management dashboard</p>
        <Link
          to="/employees/add"
          className="action-btn"
          style={{ marginTop: 16 }}
        >
          Add Employee
        </Link>
        {addEmployeeStatus && (
          <div
            style={{
              marginTop: 8,
              color: addEmployeeStatus.startsWith("Employee added")
                ? "#2ecc71"
                : "#e74c3c",
            }}
          >
            {addEmployeeStatus}
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon="👥"
          color="#3498db"
        />
        <StatCard
          title="Active Employees"
          value={stats.activeEmployees}
          icon="✅"
          color="#2ecc71"
        />
        <StatCard
          title="On Leave"
          value={stats.onLeave}
          icon="🏖️"
          color="#f39c12"
        />
        <StatCard
          title="New Hires"
          value={stats.newHires}
          icon="🎉"
          color="#e74c3c"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon="⏳"
          color="#3498db"
        />
        <StatCard
          title="Projects"
          value={stats.projects}
          icon="📋"
          color="#9b59b6"
        />
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <>
              <Link to="/employees/add" className="action-btn">
                Add Employee
              </Link>
              <button className="action-btn">Process Payroll</button>
              <button className="action-btn">Review Requests</button>
              <button className="action-btn">Generate Reports</button>
              <button className="action-btn">Mark Attendance</button>
              <button className="action-btn">Request Leave</button>
              <button className="action-btn">View Timesheet</button>
              <button className="action-btn">Update Profile</button>
            </>
          </div>
        </div>

        <div className="section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">👤</span>
              <div className="activity-content">
                <p>New employee John Smith joined the team</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📅</span>
              <div className="activity-content">
                <p>Monthly payroll processed successfully</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-content">
                <p>Performance reviews completed for Q1</p>
                <span className="activity-time">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
