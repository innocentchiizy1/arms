import { useState, useEffect } from "react";
import "./Organization.css";
import apiService from "../../services/api";

function Organization() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    manager: "",
    location: "",
    budget: "",
  });
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await apiService.getDepartments();
      setDepartments(data);
    } catch (err) {
      setDepartments([]);
    }
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    if (
      !addForm.name ||
      !addForm.manager ||
      !addForm.location ||
      !addForm.budget
    ) {
      setAddError("All fields are required.");
      return;
    }
    try {
      await apiService.createDepartment(addForm);
      setAddSuccess("Department added successfully!");
      setTimeout(async () => {
        setAddForm({ name: "", manager: "", location: "", budget: "" });
        setShowAddForm(false);
        setAddSuccess("");
        await fetchDepartments();
      }, 1500);
    } catch (err) {
      setAddError("Failed to add department.");
    }
  };

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

      <div className="add-department-section">
        <button
          className="add-department-btn add"
          onClick={() => setShowAddForm((v) => !v)}
        >
          {showAddForm ? "Cancel" : "Add Department"}
        </button>
        {showAddForm && (
          <form
            className="department-form"
            onSubmit={handleAddSubmit}
            autoComplete="off"
          >
            {addError && <div className="error-message">{addError}</div>}
            {addSuccess && <div className="success-message">{addSuccess}</div>}
            <div className="form-row">
              <div className="form-group">
                <div className="field-title">Department Name</div>
                <input
                  type="text"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <div className="field-title">Manager</div>
                <input
                  type="text"
                  name="manager"
                  value={addForm.manager}
                  onChange={handleAddChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="field-title">Location</div>
                <input
                  type="text"
                  name="location"
                  value={addForm.location}
                  onChange={handleAddChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <div className="field-title">Budget</div>
                <input
                  type="text"
                  name="budget"
                  value={addForm.budget}
                  onChange={handleAddChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Add Department
              </button>
            </div>
          </form>
        )}
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
