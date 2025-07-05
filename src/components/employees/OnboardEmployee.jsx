import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeForm.css";

const initialData = {
  firstName: "Alice",
  lastName: "Nguyen",
  password: "Password123!",
  email: "alice.mike@example.com",
  companyId: "5f14418e-7d4e-46fc-80f8-88e3f3a47791",
  staffId: "240316",
  employmentDetails: {
    departmentId: "344a10bd-fa8d-4e88-8d44-9eaf10f7fec5",
    employmentType: "full_time",
    employmentStatus: "active",
    hireDate: "2023-03-01",
    salary: 950800,
    currency: "USD",
  },
};

function OnboardEmployee() {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.employmentDetails) {
      setFormData({
        ...formData,
        employmentDetails: {
          ...formData.employmentDetails,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/employees/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess("Employee onboarded successfully!");
        setTimeout(() => navigate("/employees"), 1500);
      } else {
        setError("Failed to onboard employee.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-form">
      <div className="form-header">
        <h2>Onboard New Employee</h2>
        <p>Fill in the details to onboard a new employee</p>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Company ID *</label>
            <input
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Staff ID *</label>
            <input
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department ID *</label>
            <input
              name="departmentId"
              value={formData.employmentDetails.departmentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Employment Type *</label>
            <select
              name="employmentType"
              value={formData.employmentDetails.employmentType}
              onChange={handleChange}
              required
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          <div className="form-group">
            <label>Employment Status *</label>
            <select
              name="employmentStatus"
              value={formData.employmentDetails.employmentStatus}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hire Date *</label>
            <input
              type="date"
              name="hireDate"
              value={formData.employmentDetails.hireDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salary *</label>
            <input
              type="number"
              name="salary"
              value={formData.employmentDetails.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Currency *</label>
            <input
              name="currency"
              value={formData.employmentDetails.currency}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Onboarding..." : "Onboard Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnboardEmployee;
