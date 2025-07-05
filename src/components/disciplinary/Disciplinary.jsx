import "./Disciplinary.css";

function Disciplinary() {
  return (
    <div className="disciplinary">
      <div className="disciplinary-header">
        <h2>Disciplinary</h2>
        <p>Track and manage disciplinary cases and actions</p>
      </div>
      <div className="disciplinary-content">
        <h3>Recent Cases</h3>
        <table className="disciplinary-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DC-001</td>
              <td>John Doe</td>
              <td>2024-06-20</td>
              <td>Open</td>
              <td>Verbal Warning</td>
            </tr>
            <tr>
              <td>DC-002</td>
              <td>Jane Smith</td>
              <td>2024-06-18</td>
              <td>Closed</td>
              <td>Written Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Disciplinary;
