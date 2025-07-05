import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await apiService.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setError("Failed to load employees");

      // Fallback to mock data if API fails
      setEmployees([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@company.com",
          department: "Engineering",
          position: "Senior Developer",
          status: "Active",
          joinDate: "2023-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@company.com",
          department: "Marketing",
          position: "Marketing Manager",
          status: "Active",
          joinDate: "2022-08-20",
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
          department: "Sales",
          position: "Sales Representative",
          status: "On Leave",
          joinDate: "2023-03-10",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiService.deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
      } catch (err) {
        console.error("Failed to delete employee:", err);
        alert("Failed to delete employee");
      }
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];

  if (loading) {
    return (
      <div className="employee-list">
        <div className="loading">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="employee-list">
      <div className="employee-header">
        <div className="header-left">
          <h2>Employees</h2>
          <p>Manage your organization's employees</p>
        </div>
        <div className="employee-actions">
          <button
            className="add-employee-btn"
            onClick={() => navigate("/employees/onboard")}
          >
            ➕ Add Employee
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="department-filter">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="employee-name">
                    <div className="avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    {employee.name}
                  </div>
                </td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <span
                    className={`status ${employee.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <Link
                      to={`/employees/edit/${employee.id}`}
                      className="action-btn edit"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="action-btn delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="no-results">
          <p>No employees found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
