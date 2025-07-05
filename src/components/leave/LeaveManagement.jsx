import { useState, useEffect } from "react";
import "./LeaveManagement.css";

function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Simulate fetching leave requests
    const mockRequests = [
      {
        id: 1,
        employeeName: "Sarah Johnson",
        employeeEmail: "sarah.johnson@company.com",
        leaveType: "Annual Leave",
        startDate: "2024-01-15",
        endDate: "2024-01-19",
        days: 5,
        reason: "Family vacation",
        status: "Pending",
        submittedDate: "2024-01-10",
      },
      {
        id: 2,
        employeeName: "Mike Chen",
        employeeEmail: "mike.chen@company.com",
        leaveType: "Sick Leave",
        startDate: "2024-01-12",
        endDate: "2024-01-12",
        days: 1,
        reason: "Not feeling well",
        status: "Approved",
        submittedDate: "2024-01-11",
      },
      {
        id: 3,
        employeeName: "Jane Smith",
        employeeEmail: "jane.smith@company.com",
        leaveType: "Personal Leave",
        startDate: "2024-01-20",
        endDate: "2024-01-22",
        days: 3,
        reason: "Personal matters",
        status: "Rejected",
        submittedDate: "2024-01-08",
      },
    ];
    setLeaveRequests(mockRequests);
  }, []);

  const filteredRequests = leaveRequests.filter(
    (request) =>
      filterStatus === "all" || request.status.toLowerCase() === filterStatus
  );

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((requests) =>
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "#27ae60";
      case "rejected":
        return "#e74c3c";
      case "pending":
        return "#f39c12";
      default:
        return "#7f8c8d";
    }
  };

  return (
    <div className="leave-management">
      <div className="leave-header">
        <div className="header-left">
          <h2>Leave Management</h2>
          <p>Manage employee leave requests and approvals</p>
        </div>
        <button className="new-request-btn">➕ New Leave Request</button>
      </div>

      <div className="filters">
        <div className="status-filter">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="leave-requests">
        {filteredRequests.map((request) => (
          <div key={request.id} className="leave-card">
            <div className="leave-header-card">
              <div className="employee-info">
                <h3>{request.employeeName}</h3>
                <p>{request.employeeEmail}</p>
              </div>
              <div className="leave-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(request.status) }}
                >
                  {request.status}
                </span>
              </div>
            </div>

            <div className="leave-details">
              <div className="detail-row">
                <span className="label">Leave Type:</span>
                <span>{request.leaveType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration:</span>
                <span>
                  {request.startDate} to {request.endDate} ({request.days} days)
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span>{request.reason}</span>
              </div>
              <div className="detail-row">
                <span className="label">Submitted:</span>
                <span>
                  {new Date(request.submittedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {request.status === "Pending" && (
              <div className="leave-actions">
                <button
                  onClick={() => handleStatusChange(request.id, "Approved")}
                  className="action-btn approve"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleStatusChange(request.id, "Rejected")}
                  className="action-btn reject"
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="no-requests">
          <p>No leave requests found.</p>
        </div>
      )}
    </div>
  );
}

export default LeaveManagement;
