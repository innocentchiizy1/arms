import "./Timesheet.css";

function Timesheet() {
  return (
    <div className="timesheet">
      <div className="timesheet-header">
        <h2>Timesheet</h2>
        <p>Track and manage employee working hours and attendance</p>
      </div>
      <div className="timesheet-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-07-05</td>
              <td>Alice Nguyen</td>
              <td>09:00</td>
              <td>17:00</td>
              <td>8</td>
              <td>Present</td>
            </tr>
            <tr>
              <td>2024-07-05</td>
              <td>John Doe</td>
              <td>09:15</td>
              <td>17:10</td>
              <td>7.92</td>
              <td>Late</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timesheet;
