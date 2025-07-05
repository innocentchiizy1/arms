export const BASE_URL = 'https://59dd-197-211-59-77.ngrok-free.app';

// Common headers for all requests
const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = localStorage.getItem("hrm_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: getHeaders(options.includeAuth !== false),
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
};

// API Service methods
export const apiService = {
  BASE_URL, // Export BASE_URL for testing

  // Health check
  healthCheck: () => apiRequest("/"),

  // Authentication
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      includeAuth: false,
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  // User management
  getCurrentUser: () => apiRequest("/auth/me"),

  // Employee management
  getEmployees: () => apiRequest("/employees"),
  getEmployee: (id) => apiRequest(`/employees/${id}`),
  createEmployee: (employeeData) =>
    apiRequest("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    }),
  updateEmployee: (id, employeeData) =>
    apiRequest(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employeeData),
    }),
  deleteEmployee: (id) =>
    apiRequest(`/employees/${id}`, {
      method: "DELETE",
    }),

  // Dashboard
  getDashboardStats: () => apiRequest("/dashboard/stats"),

  // Leave management
  getLeaves: () => apiRequest("/leaves"),
  createLeave: (leaveData) =>
    apiRequest("/leaves", {
      method: "POST",
      body: JSON.stringify(leaveData),
    }),
  updateLeave: (id, leaveData) =>
    apiRequest(`/leaves/${id}`, {
      method: "PUT",
      body: JSON.stringify(leaveData),
    }),

  // Attendance
  getAttendance: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/attendance${queryString ? `?${queryString}` : ""}`);
  },
  markAttendance: (attendanceData) =>
    apiRequest("/attendance", {
      method: "POST",
      body: JSON.stringify(attendanceData),
    }),

  // Payroll
  getPayroll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/payroll${queryString ? `?${queryString}` : ""}`);
  },

  // Timesheet
  getTimesheets: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/timesheets${queryString ? `?${queryString}` : ""}`);
  },
  createTimesheet: (timesheetData) =>
    apiRequest("/timesheets", {
      method: "POST",
      body: JSON.stringify(timesheetData),
    }),

  // Onboarding
  submitCompanyOnboarding: (data) => {
    return fetch(`${BASE_URL}/api/v1/company/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      return res.json();
    });
  },

  // Generic CRUD operations
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, data) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (endpoint, data) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (endpoint) =>
    apiRequest(endpoint, {
      method: "DELETE",
    }),
};

export default apiService;
