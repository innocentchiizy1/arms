import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ user }) {
  // Define menu items based on user role
  const getMenuItems = (userRole) => {
    const adminMenuItems = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "📊",
      },
      {
        path: "/organization",
        name: "Organization",
        icon: "🏢",
      },
      {
        path: "/core-hr",
        name: "Core HR",
        icon: "👥",
      },
      {
        path: "/employees",
        name: "Employees",
        icon: "👤",
      },
      {
        path: "/timesheet",
        name: "Timesheet",
        icon: "⏰",
      },
      {
        path: "/leave",
        name: "Leave Management",
        icon: "📅",
      },
      {
        path: "/attendance",
        name: "Attendance",
        icon: "✅",
      },
      {
        path: "/recommendation",
        name: "Recommendation",
        icon: "💡",
      },
      {
        path: "/disciplinary",
        name: "Disciplinary",
        icon: "⚠️",
      },
      {
        path: "/training",
        name: "Training",
        icon: "🎓",
      },
      {
        path: "/performance",
        name: "Performance",
        icon: "📈",
      },
      {
        path: "/payroll",
        name: "Payroll",
        icon: "💰",
      },
      {
        path: "/tickets",
        name: "Tickets",
        icon: "🎫",
      },
      {
        path: "/files-manager",
        name: "Files Manager",
        icon: "📁",
      },
      {
        path: "/project-manager",
        name: "Project Manager",
        icon: "📋",
      },
      {
        path: "/assets",
        name: "Assets",
        icon: "💻",
      },
      {
        path: "/events-meetings",
        name: "Events & Meetings",
        icon: "📅",
      },
    ];

    const employeeMenuItems = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "📊",
      },
      {
        path: "/timesheet",
        name: "My Timesheet",
        icon: "⏰",
      },
      {
        path: "/leave",
        name: "Leave Requests",
        icon: "📅",
      },
      {
        path: "/attendance",
        name: "My Attendance",
        icon: "✅",
      },
      {
        path: "/performance",
        name: "My Performance",
        icon: "📈",
      },
      {
        path: "/tickets",
        name: "Support Tickets",
        icon: "🎫",
      },
      {
        path: "/files-manager",
        name: "Company Files",
        icon: "📁",
      },
      {
        path: "/events-meetings",
        name: "Events & Meetings",
        icon: "📅",
      },
    ];

    // Return appropriate menu based on role
    return adminMenuItems;
  };

  const menuItems = getMenuItems(user?.role);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HRM Portal</h2>
        <p>Welcome, {user?.name}</p>
        <span className="user-role-badge">{user?.role}</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
