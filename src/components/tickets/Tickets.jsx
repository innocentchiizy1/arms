import "./Tickets.css";

function Tickets() {
  return (
    <div className="tickets">
      <div className="tickets-header">
        <h2>Tickets</h2>
        <p>Manage support and HR tickets</p>
      </div>
      <div className="tickets-content">
        <h3>Open Tickets</h3>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TCK-101</td>
              <td>Payroll Issue</td>
              <td>Open</td>
              <td>Jane Smith</td>
              <td>2024-07-01</td>
            </tr>
            <tr>
              <td>TCK-102</td>
              <td>Leave Request</td>
              <td>In Progress</td>
              <td>Mike Johnson</td>
              <td>2024-07-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
