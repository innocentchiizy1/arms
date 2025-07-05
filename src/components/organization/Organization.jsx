import { useState, useEffect } from "react";
import "./Organization.css";

function Organization() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    // Simulate fetching organization data
    const mockDepartments = [
      {
        id: 1,
        name: "Executive",
        manager: "John CEO",
        employeeCount: 5,
        budget: "$2,500,000",
        location: "Floor 10",
      },
      {
        id: 2,
        name: "Engineering",
        manager: "Sarah Tech Lead",
        employeeCount: 45,
        budget: "$4,200,000",
        location: "Floor 8-9",
      },
      {
        id: 3,
        name: "Marketing",
        manager: "Mike Marketing",
        employeeCount: 12,
        budget: "$1,800,000",
        location: "Floor 7",
      },
      {
        id: 4,
        name: "Sales",
        manager: "Lisa Sales",
        employeeCount: 25,
        budget: "$3,100,000",
        location: "Floor 6",
      },
      {
        id: 5,
        name: "HR",
        manager: "David HR",
        employeeCount: 8,
        budget: "$900,000",
        location: "Floor 5",
      },
      {
        id: 6,
        name: "Finance",
        manager: "Anna Finance",
        employeeCount: 15,
        budget: "$1,500,000",
        location: "Floor 4",
      },
    ];
    setDepartments(mockDepartments);
  }, []);

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + dept.employeeCount,
    0
  );
  const totalBudget = departments.reduce(
    (sum, dept) => sum + parseInt(dept.budget.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="organization">
      <div className="organization-header">
        <h2>Organization</h2>
        <p>Company structure and department management</p>
      </div>

      <div className="org-stats">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{departments.length}</h3>
            <p>Departments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>${(totalBudget / 1000000).toFixed(1)}M</h3>
            <p>Total Budget</p>
          </div>
        </div>
      </div>

      <div className="org-content">
        <div className="departments-section">
          <h3>Departments</h3>
          <div className="departments-grid">
            {departments.map((dept) => (
              <div key={dept.id} className="department-card">
                <div className="dept-header">
                  <h4>{dept.name}</h4>
                  <span className="dept-location">{dept.location}</span>
                </div>
                <div className="dept-details">
                  <div className="dept-info">
                    <span className="label">Manager:</span>
                    <span>{dept.manager}</span>
                  </div>
                  <div className="dept-info">
                    <span className="label">Employees:</span>
                    <span>{dept.employeeCount}</span>
                  </div>
                  <div className="dept-info">
                    <span className="label">Budget:</span>
                    <span>{dept.budget}</span>
                  </div>
                </div>
                <div className="dept-actions">
                  <button className="action-btn">View Details</button>
                  <button className="action-btn">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="org-chart-section">
          <h3>Organizational Chart</h3>
          <div className="org-chart">
            <div className="chart-level">
              <div className="chart-node ceo">
                <div className="node-content">
                  <div className="node-avatar">JC</div>
                  <div className="node-info">
                    <h4>John CEO</h4>
                    <p>Chief Executive Officer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-connectors">
              <div className="connector"></div>
              <div className="connector"></div>
              <div className="connector"></div>
            </div>
            <div className="chart-level">
              <div className="chart-node">
                <div className="node-content">
                  <div className="node-avatar">ST</div>
                  <div className="node-info">
                    <h4>Sarah Tech</h4>
                    <p>CTO</p>
                  </div>
                </div>
              </div>
              <div className="chart-node">
                <div className="node-content">
                  <div className="node-avatar">MM</div>
                  <div className="node-info">
                    <h4>Mike Marketing</h4>
                    <p>CMO</p>
                  </div>
                </div>
              </div>
              <div className="chart-node">
                <div className="node-content">
                  <div className="node-avatar">AF</div>
                  <div className="node-info">
                    <h4>Anna Finance</h4>
                    <p>CFO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organization;
