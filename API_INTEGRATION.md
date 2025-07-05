# HRM Portal API Integration

This document explains how the HRM Portal frontend integrates with the TypeScript backend API.

## 🚀 Backend API

**Base URL:** `https://4d7d-197-211-59-77.ngrok-free.app`

The backend is a TypeScript API that provides the following endpoints:

### Health Check

- **GET** `/` - API health check and version info

### Authentication

- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **GET** `/auth/me` - Get current user info

### Employee Management

- **GET** `/employees` - Get all employees
- **GET** `/employees/:id` - Get specific employee
- **POST** `/employees` - Create new employee
- **PUT** `/employees/:id` - Update employee
- **DELETE** `/employees/:id` - Delete employee

### Dashboard

- **GET** `/dashboard/stats` - Get dashboard statistics

### Leave Management

- **GET** `/leaves` - Get all leave requests
- **POST** `/leaves` - Create leave request
- **PUT** `/leaves/:id` - Update leave request

### Attendance

- **GET** `/attendance` - Get attendance records
- **POST** `/attendance` - Mark attendance

### Payroll

- **GET** `/payroll` - Get payroll information

### Timesheet

- **GET** `/timesheets` - Get timesheet records
- **POST** `/timesheets` - Create timesheet entry

### Onboarding

- **POST** `/onboarding` - Submit onboarding request

## 🔧 Frontend Integration

### API Service (`src/services/api.js`)

The frontend uses a centralized API service that handles:

- **Base URL configuration**
- **Authentication headers** (Bearer tokens)
- **Error handling**
- **Request/response formatting**

```javascript
import apiService from "../services/api";

// Example usage
const employees = await apiService.getEmployees();
const stats = await apiService.getDashboardStats();
```

### Authentication Flow

1. **Login** - User submits credentials
2. **Token Storage** - JWT token stored in localStorage
3. **Automatic Headers** - All subsequent requests include Authorization header
4. **Token Refresh** - (Can be implemented for token expiration)

### Error Handling

The API service includes comprehensive error handling:

- **Network errors** - Connection issues
- **HTTP errors** - 4xx/5xx status codes
- **Authentication errors** - Invalid/expired tokens
- **Fallback data** - Mock data when API is unavailable

## 🧪 Testing API Connection

### Test Page

Visit `/test-api` to test the API connection:

1. **Health Check** - Verify API is running
2. **Login Test** - Test authentication
3. **Employee Data** - Test employee endpoints
4. **Dashboard Stats** - Test dashboard data

### Manual Testing

```javascript
// Test health check
const health = await apiService.healthCheck();
console.log("API Health:", health);

// Test login
const login = await apiService.login({
  email: "admin@company.com",
  password: "password123",
});
console.log("Login Response:", login);
```

## 📊 Data Flow

### Dashboard

1. Component mounts
2. Calls `apiService.getDashboardStats()`
3. Displays real data or fallback mock data
4. Shows loading states during API calls

### Employee List

1. Component mounts
2. Calls `apiService.getEmployees()`
3. Renders employee table
4. Handles search/filtering locally

### Onboarding Form

1. User fills multi-step form
2. Submits to `apiService.submitOnboarding()`
3. Redirects to success page
4. Data sent to backend for lead qualification

## 🔒 Security

### Authentication

- **JWT Tokens** - Stored in localStorage
- **Bearer Authorization** - Automatic header inclusion
- **Token Validation** - Backend validates tokens

### CORS

- Backend should allow requests from frontend domain
- Configured for development and production

## 🚨 Error Scenarios

### API Unavailable

- Frontend falls back to mock data
- User sees appropriate error messages
- Functionality remains available with demo data

### Authentication Failed

- User redirected to login
- Token cleared from localStorage
- Clear error messaging

### Network Issues

- Retry logic can be implemented
- Offline indicators
- Graceful degradation

## 🔄 Development Workflow

### Adding New Endpoints

1. **Add to API Service:**

```javascript
// In src/services/api.js
newEndpoint: (data) => apiRequest('/new-endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
}),
```

2. **Use in Component:**

```javascript
// In component
const result = await apiService.newEndpoint(data);
```

3. **Handle Errors:**

```javascript
try {
  const result = await apiService.newEndpoint(data);
} catch (error) {
  console.error("API Error:", error);
  // Handle error appropriately
}
```

### Environment Configuration

For different environments, update the BASE_URL:

```javascript
// Development
const BASE_URL = "https://4d7d-197-211-59-77.ngrok-free.app";

// Production
const BASE_URL = "https://your-production-api.com";
```

## 📝 API Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🎯 Next Steps

1. **Implement remaining endpoints** (Payroll, Timesheet, etc.)
2. **Add real-time updates** (WebSocket integration)
3. **Implement file upload** for employee documents
4. **Add pagination** for large datasets
5. **Implement caching** for better performance
6. **Add offline support** with service workers

## 🔗 Useful Links

- **Backend API:** https://4d7d-197-211-59-77.ngrok-free.app
- **API Test Page:** http://localhost:5173/test-api
- **Onboarding Flow:** http://localhost:5173/onboarding
