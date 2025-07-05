import { useState } from "react";
import apiService from "../services/api";
import "./TestAPI.css";

const onboardingPayload = {
  name: "Test Company",
  industry: "Technology",
  sizeCategory: "startup",
  address: {
    street: "123 Main St",
    city: "Metropolis",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  contactInfo: {
    phone: "+1-555-1234",
    email: "info@testcompany.com",
    website: "https://testcompany.com",
  },
  settings: {
    timezone: "America/Los_Angeles",
    currency: "USD",
  },
  firstName: "Test",
  lastName: "User",
  email: "test.user@testcompany.com",
  staffId: "TEST001",
};

function TestAllAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testAll = async () => {
    setLoading(true);
    const testResults = {};

    // Onboarding
    try {
      const onboarding = await apiService.submitCompanyOnboarding(
        onboardingPayload
      );
      testResults.onboarding = {
        success: true,
        data: onboarding,
        request: onboardingPayload,
      };
    } catch (error) {
      testResults.onboarding = {
        success: false,
        error: error.message,
        request: onboardingPayload,
      };
    }

    // Health check
    try {
      const health = await apiService.healthCheck();
      testResults.health = { success: true, data: health };
    } catch (error) {
      testResults.health = { success: false, error: error.message };
    }

    // Login
    try {
      const login = await apiService.login({
        email: "admin@company.com",
        password: "password123",
      });
      testResults.login = { success: true, data: login };
    } catch (error) {
      testResults.login = { success: false, error: error.message };
    }

    // Employees
    try {
      const employees = await apiService.getEmployees();
      testResults.employees = { success: true, data: employees };
    } catch (error) {
      testResults.employees = { success: false, error: error.message };
    }

    // Dashboard
    try {
      const stats = await apiService.getDashboardStats();
      testResults.dashboard = { success: true, data: stats };
    } catch (error) {
      testResults.dashboard = { success: false, error: error.message };
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="test-api">
      <h2>Test All Main API Endpoints</h2>
      <p>
        Base URL: <strong>{apiService.BASE_URL}</strong>
      </p>
      <button onClick={testAll} disabled={loading} className="test-btn">
        {loading ? "Testing..." : "Test All APIs"}
      </button>
      {Object.keys(results).length > 0 && (
        <div className="results">
          <h3>Test Results:</h3>
          {Object.entries(results).map(([endpoint, result]) => (
            <div
              key={endpoint}
              className={`result-item ${result.success ? "success" : "error"}`}
            >
              <h4>{endpoint.toUpperCase()}</h4>
              {result.request && (
                <>
                  <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                    Request:
                  </div>
                  <pre>{JSON.stringify(result.request, null, 2)}</pre>
                </>
              )}
              {result.success ? (
                <div>
                  <span className="status success">✅ Success</span>
                  <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              ) : (
                <div>
                  <span className="status error">❌ Failed</span>
                  <p className="error-message">{result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestAllAPI;
