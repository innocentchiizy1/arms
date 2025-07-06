import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeForm.css";
import apiService from "../../services/api";

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    staffId: "",
    employmentType: "",
    hireDate: "",
    employmentDetails: {
      employmentType: "",
      employmentStatus: "",
      hireDate: "",
      salary: "",
      currency: "",
    },
  });

  // Reset form data when component mounts to ensure it's blank
  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      staffId: "",
      employmentType: "",
      hireDate: "",
      employmentDetails: {
        employmentType: "",
        employmentStatus: "",
        hireDate: "",
        salary: "",
        currency: "",
      },
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      // TODO: Fetch real employee data when edit functionality is implemented
      // For now, keep form blank even in edit mode
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("employmentDetails.")) {
      const key = name.replace("employmentDetails.", "");
      setFormData((prev) => ({
        ...prev,
        employmentDetails: {
          ...prev.employmentDetails,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await apiService.createEmployee(formData);
      setSuccess("Employee added successfully!");
      setTimeout(() => {
        navigate("/employees");
      }, 1500); // Show message for 1.5 seconds
    } catch (error) {
      console.error("Error saving employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Design",
  ];

  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Marketing Manager",
    "Sales Representative",
    "HR Specialist",
    "Financial Analyst",
    "Product Designer",
  ];

  return (
    <div className="employee-form">
      <div className="form-header">
        <h2>{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
        <p>
          {isEdit
            ? "Update employee information"
            : "Add a new employee to your organization"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        {success && <div className="success-message">{success}</div>}
        <div className="form-grid">
          <div className="form-group">
            <div className="field-title">First Name *</div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Last Name *</div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Email *</div>
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
            <div className="field-title">Staff ID *</div>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Employment Type *</div>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <div className="field-title">Hire Date *</div>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Employment Details Type *</div>
            <select
              id="employmentDetails.employmentType"
              name="employmentDetails.employmentType"
              value={formData.employmentDetails.employmentType}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <div className="field-title">Employment Status *</div>
            <select
              id="employmentDetails.employmentStatus"
              name="employmentDetails.employmentStatus"
              value={formData.employmentDetails.employmentStatus}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div className="form-group">
            <div className="field-title">Employment Details Hire Date *</div>
            <input
              type="date"
              id="employmentDetails.hireDate"
              name="employmentDetails.hireDate"
              value={formData.employmentDetails.hireDate}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Salary *</div>
            <input
              type="number"
              id="employmentDetails.salary"
              name="employmentDetails.salary"
              value={formData.employmentDetails.salary}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="field-title">Currency *</div>
            <input
              type="text"
              id="employmentDetails.currency"
              name="employmentDetails.currency"
              value={formData.employmentDetails.currency}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
