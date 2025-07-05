import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeForm.css";

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    joinDate: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      // Simulate fetching employee data
      const mockEmployee = {
        id: id,
        name: "John Doe",
        email: "john.doe@company.com",
        phone: "+1 234 567 8900",
        department: "Engineering",
        position: "Senior Developer",
        salary: "75000",
        joinDate: "2023-01-15",
        status: "Active",
      };
      setFormData(mockEmployee);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to employee list
      navigate("/employees");
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

      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </div>

          <div className="form-group">
            <label htmlFor="joinDate">Join Date *</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Terminated">Terminated</option>
            </select>
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
