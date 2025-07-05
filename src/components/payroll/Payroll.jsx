import { useState, useEffect } from 'react'
import './Payroll.css'

function Payroll() {
  const [payrollData, setPayrollData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    // Simulate fetching payroll data
    const mockData = [
      {
        id: 1,
        employeeName: 'John Doe',
        employeeEmail: 'john.doe@company.com',
        department: 'Engineering',
        baseSalary: 75000,
        allowances: 5000,
        deductions: 2000,
        netSalary: 78000,
        status: 'Paid',
        paymentDate: '2024-01-05'
      },
      {
        id: 2,
        employeeName: 'Jane Smith',
        employeeEmail: 'jane.smith@company.com',
        department: 'Marketing',
        baseSalary: 65000,
        allowances: 4000,
        deductions: 1800,
        netSalary: 67200,
        status: 'Paid',
        paymentDate: '2024-01-05'
      },
      {
        id: 3,
        employeeName: 'Mike Johnson',
        employeeEmail: 'mike.johnson@company.com',
        department: 'HR',
        baseSalary: 60000,
        allowances: 3500,
        deductions: 1600,
        netSalary: 61900,
        status: 'Pending',
        paymentDate: null
      },
      {
        id: 4,
        employeeName: 'Sarah Wilson',
        employeeEmail: 'sarah.wilson@company.com',
        department: 'Finance',
        baseSalary: 70000,
        allowances: 4500,
        deductions: 1900,
        netSalary: 72600,
        status: 'Paid',
        paymentDate: '2024-01-05'
      }
    ]
    setPayrollData(mockData)
  }, [])

  const totalPayroll = payrollData.reduce((sum, item) => sum + item.netSalary, 0)
  const paidCount = payrollData.filter(item => item.status === 'Paid').length
  const pendingCount = payrollData.filter(item => item.status === 'Pending').length

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return '#27ae60'
      case 'pending': return '#f39c12'
      default: return '#7f8c8d'
    }
  }

  return (
    <div className="payroll">
      <div className="payroll-header">
        <div className="header-left">
          <h2>Payroll Management</h2>
          <p>Manage employee salaries and payments</p>
        </div>
        <div className="month-picker">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      <div className="payroll-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{formatCurrency(totalPayroll)}</h3>
            <p>Total Payroll</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{paidCount}</h3>
            <p>Paid</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{payrollData.length}</h3>
            <p>Total Employees</p>
          </div>
        </div>
      </div>

      <div className="payroll-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Base Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map(record => (
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
                <td>{record.department}</td>
                <td>{formatCurrency(record.baseSalary)}</td>
                <td>{formatCurrency(record.allowances)}</td>
                <td>{formatCurrency(record.deductions)}</td>
                <td className="net-salary">{formatCurrency(record.netSalary)}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(record.status) }}
                  >
                    {record.status}
                  </span>
                </td>
                <td>
                  {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="payroll-actions">
        <button className="action-btn">
          📊 Generate Payroll Report
        </button>
        <button className="action-btn">
          💳 Process Payments
        </button>
        <button className="action-btn">
          📧 Send Payslips
        </button>
      </div>
    </div>
  )
}

export default Payroll 