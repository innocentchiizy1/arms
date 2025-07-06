import { useState } from "react";
import apiService from "../services/api";
import "./TestAPI.css";

function TestAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("admin@company.com");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [loginResult, setLoginResult] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeOpId, setEmployeeOpId] = useState("");
  const [departmentStatus, setDepartmentStatus] = useState("");

  // Sample employee payload
  const sampleEmployee = {
    firstName: "Test",
    lastName: "Employee",
    email: `testemployee${Math.floor(Math.random() * 10000)}@example.com`,
    staffId: `TST${Math.floor(Math.random() * 10000)}`,
    employmentType: "full_time",
    hireDate: "2023-03-01",
    employmentDetails: {
      employmentType: "full_time",
      employmentStatus: "active",
      hireDate: "2023-03-01",
      salary: 50000,
      currency: "USD",
    },
  };

  // Sample department payload
  const sampleDepartment = {
    name: "Application Development",
    code: "APPDEV",
    // parentDepartmentId: null,
    // managerId: null,
    budget: 900000,
  };

  const handleTest = async (type) => {
    setLoading(true);
    setResults((prev) => ({ ...prev, [type]: null }));
    try {
      let data;
      if (type === "list") {
        data = await apiService.getEmployees();
      } else if (type === "get") {
        data = await apiService.getEmployee(employeeId);
      } else if (type === "create") {
        data = await apiService.createEmployee(sampleEmployee);
      } else if (type === "update") {
        data = await apiService.updateEmployee(employeeOpId, {
          ...sampleEmployee,
          firstName: "Updated",
        });
      } else if (type === "delete") {
        data = await apiService.deleteEmployee(employeeOpId);
      }
      setResults((prev) => ({ ...prev, [type]: { success: true, data } }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [type]: { success: false, error: error.message },
      }));
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    setLoginResult(null);
    try {
      const login = await apiService.login({
        email: loginEmail,
        password: loginPassword,
      });
      if (login.data && login.data.token) {
        localStorage.setItem("hrm_token", login.data.token);
      }
      setLoginResult({ success: true, data: login });
    } catch (error) {
      setLoginResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const testEndpoints = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test health check
      const health = await apiService.healthCheck();
      testResults.health = { success: true, data: health };
    } catch (error) {
      testResults.health = { success: false, error: error.message };
    }

    try {
      // Test employees endpoint
      const employees = await apiService.getEmployees();
      testResults.employees = { success: true, data: employees };
    } catch (error) {
      testResults.employees = { success: false, error: error.message };
    }

    try {
      // Test dashboard stats
      const stats = await apiService.getDashboardStats();
      testResults.dashboard = { success: true, data: stats };
    } catch (error) {
      testResults.dashboard = { success: false, error: error.message };
    }

    setResults(testResults);
    setLoading(false);
  };

  const handleCreateDepartment = async () => {
    setDepartmentStatus("");
    try {
      await apiService.createDepartment(sampleDepartment);
      setDepartmentStatus("Department created successfully!");
    } catch (err) {
      setDepartmentStatus(
        "Failed to create department: " + (err.message || "Unknown error")
      );
    }
  };

  return (
    <div className="test-api">
      <h2>API Connection Test</h2>
      <p>
        Testing connection to: <strong>{apiService.BASE_URL}</strong>
      </p>

      <div className="login-test-section">
        <h3>Test Login API</h3>
        <div className="login-form-test">
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            disabled={loading}
          />
          <button onClick={testLogin} disabled={loading} className="test-btn">
            {loading ? "Testing..." : "Test Login"}
          </button>
        </div>
        {loginResult && (
          <div
            className={`result-item ${
              loginResult.success ? "success" : "error"
            }`}
          >
            <h4>LOGIN</h4>
            {loginResult.success ? (
              <div>
                <span className="status success">✅ Success</span>
                <pre>{JSON.stringify(loginResult.data, null, 2)}</pre>
              </div>
            ) : (
              <div>
                <span className="status error">❌ Failed</span>
                <p className="error-message">{loginResult.error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <hr style={{ margin: "32px 0" }} />

      <h3>Test Department API</h3>
      <div className="department-api-test">
        <button
          onClick={handleCreateDepartment}
          disabled={loading}
          className="test-btn"
        >
          Create Department (Sample)
        </button>
        {departmentStatus && (
          <div
            style={{
              marginTop: 8,
              color: departmentStatus.startsWith("Department created")
                ? "#2ecc71"
                : "#e74c3c",
            }}
          >
            {departmentStatus}
          </div>
        )}
      </div>

      <hr style={{ margin: "32px 0" }} />

      <h3>Test Employee API Endpoints</h3>
      <div className="employee-api-test">
        <button
          onClick={() => handleTest("list")}
          disabled={loading}
          className="test-btn"
        >
          List All Employees
        </button>
        <div style={{ marginTop: 8 }}>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            disabled={loading}
            style={{ marginRight: 8 }}
          />
          <button
            onClick={() => handleTest("get")}
            disabled={loading || !employeeId}
            className="test-btn"
          >
            Get Employee by ID
          </button>
        </div>
        <button
          onClick={() => handleTest("create")}
          disabled={loading}
          className="test-btn"
          style={{ marginTop: 8 }}
        >
          Create Employee (Sample)
        </button>
        <div style={{ marginTop: 8 }}>
          <input
            type="text"
            value={employeeOpId}
            onChange={(e) => setEmployeeOpId(e.target.value)}
            disabled={loading}
            style={{ marginRight: 8 }}
          />
          <button
            onClick={() => handleTest("update")}
            disabled={loading || !employeeOpId}
            className="test-btn"
          >
            Update Employee
          </button>
          <button
            onClick={() => handleTest("delete")}
            disabled={loading || !employeeOpId}
            className="test-btn"
            style={{ marginLeft: 8 }}
          >
            Delete Employee
          </button>
        </div>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="results">
          <h3>Test Results:</h3>
          {Object.entries(results).map(([endpoint, result]) => (
            <div
              key={endpoint}
              className={`result-item ${
                result && result.success ? "success" : "error"
              }`}
            >
              <h4>{endpoint.toUpperCase()}</h4>
              {result && result.success ? (
                <div>
                  <span className="status success">✅ Success</span>
                  <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              ) : (
                <div>
                  <span className="status error">❌ Failed</span>
                  <p className="error-message">{result && result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestAPI;
