import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Organization from "./components/organization/Organization";
import CoreHR from "./components/core-hr/CoreHR";
import EmployeeList from "./components/employees/EmployeeList";
import EmployeeForm from "./components/employees/EmployeeForm";
import OnboardEmployee from "./components/employees/OnboardEmployee";
import Timesheet from "./components/timesheet/Timesheet";
import LeaveManagement from "./components/leave/LeaveManagement";
import Attendance from "./components/attendance/Attendance";
import Recommendation from "./components/recommendation/Recommendation";
import Disciplinary from "./components/disciplinary/Disciplinary";
import Training from "./components/training/Training";
import Performance from "./components/performance/Performance";
import Payroll from "./components/payroll/Payroll";
import Tickets from "./components/tickets/Tickets";
import FilesManager from "./components/files-manager/FilesManager";
import ProjectManager from "./components/project-manager/ProjectManager";
import Assets from "./components/assets/Assets";
import EventsMeetings from "./components/events-meetings/EventsMeetings";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import OnboardingLanding from "./components/onboarding/OnboardingLanding";
import OnboardingForm from "./components/onboarding/OnboardingForm";
import OnboardingSuccess from "./components/onboarding/OnboardingSuccess";
import TestAPI from "./components/TestAPI";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (check localStorage or session)
    const savedUser = localStorage.getItem("hrm_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("hrm_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("hrm_user");
  };

  return (
    <Router>
      <Routes>
        {/* Public routes (no authentication required) */}
        <Route path="/onboarding" element={<OnboardingLanding />} />
        <Route path="/onboarding/form" element={<OnboardingForm />} />
        <Route path="/onboarding/success" element={<OnboardingSuccess />} />
        <Route path="/test-api" element={<TestAPI />} />

        {/* Protected routes (require authentication) */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app">
                <Sidebar user={user} />
                <div className="main-content">
                  <Header user={user} onLogout={handleLogout} />
                  <div className="content">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                      />
                      <Route
                        path="/dashboard"
                        element={<Dashboard user={user} />}
                      />
                      <Route path="/organization" element={<Organization />} />
                      <Route path="/core-hr" element={<CoreHR />} />
                      <Route path="/employees" element={<EmployeeList />} />
                      <Route path="/employees/add" element={<EmployeeForm />} />
                      <Route
                        path="/employees/edit/:id"
                        element={<EmployeeForm />}
                      />
                      <Route
                        path="/employees/onboard"
                        element={<OnboardEmployee />}
                      />
                      <Route path="/timesheet" element={<Timesheet />} />
                      <Route path="/leave" element={<LeaveManagement />} />
                      <Route path="/attendance" element={<Attendance />} />
                      <Route
                        path="/recommendation"
                        element={<Recommendation />}
                      />
                      <Route path="/disciplinary" element={<Disciplinary />} />
                      <Route path="/training" element={<Training />} />
                      <Route path="/performance" element={<Performance />} />
                      <Route path="/payroll" element={<Payroll />} />
                      <Route path="/tickets" element={<Tickets />} />
                      <Route path="/files-manager" element={<FilesManager />} />
                      <Route
                        path="/project-manager"
                        element={<ProjectManager />}
                      />
                      <Route path="/assets" element={<Assets />} />
                      <Route
                        path="/events-meetings"
                        element={<EventsMeetings />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
