import { useState, useEffect } from 'react'
import './Attendance.css'

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    // Simulate fetching attendance data
    const mockData = [
      {
        id: 1,
        employeeName: 'John Doe',
        employeeEmail: 'john.doe@company.com',
        date: '2024-01-15',
        checkIn: '09:00',
        checkOut: '17:30',
        totalHours: 8.5,
        status: 'Present'
      },
      {
        id: 2,
        employeeName: 'Jane Smith',
        employeeEmail: 'jane.smith@company.com',
        date: '2024-01-15',
        checkIn: '08:45',
        checkOut: '17:15',
        totalHours: 8.5,
        status: 'Present'
      },
      {
        id: 3,
        employeeName: 'Mike Johnson',
        employeeEmail: 'mike.johnson@company.com',
        date: '2024-01-15',
        checkIn: '09:30',
        checkOut: '18:00',
        totalHours: 8.5,
        status: 'Late'
      },
      {
        id: 4,
        employeeName: 'Sarah Wilson',
        employeeEmail: 'sarah.wilson@company.com',
        date: '2024-01-15',
        checkIn: null,
        checkOut: null,
        totalHours: 0,
        status: 'Absent'
      }
    ]
    setAttendanceData(mockData)
  }, [])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return '#27ae60'
      case 'late': return '#f39c12'
      case 'absent': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(item => item.status === 'Present').length,
    late: attendanceData.filter(item => item.status === 'Late').length,
    absent: attendanceData.filter(item => item.status === 'Absent').length
  }

  return (
    <div className="attendance">
      <div className="attendance-header">
        <div className="header-left">
          <h2>Attendance</h2>
          <p>Track employee attendance and working hours</p>
        </div>
        <div className="date-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="attendance-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.present}</h3>
            <p>Present</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{stats.late}</h3>
            <p>Late</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>{stats.absent}</h3>
            <p>Absent</p>
          </div>
        </div>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(record => (
              <tr key={record.id}>
                <td>
                  <div className="employee-info">
                    <div className="avatar">
                      {record.employeeName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="name">{record.employeeName}</div>
                      <div className="email">{record.employeeEmail}</div>
                    </div>
                  </div>
                </td>
                <td>{record.checkIn || '-'}</td>
                <td>{record.checkOut || '-'}</td>
                <td>{record.totalHours}h</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(record.status) }}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance 