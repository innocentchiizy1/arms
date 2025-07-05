import "./Performance.css";

function Performance() {
  return (
    <div className="performance">
      <div className="performance-header">
        <h2>Performance</h2>
        <p>Review and manage employee performance</p>
      </div>
      <div className="performance-content">
        <h3>Recent Performance Reviews</h3>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Review Date</th>
              <th>Score</th>
              <th>Reviewer</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alice Nguyen</td>
              <td>2024-06-30</td>
              <td>4.8</td>
              <td>Jane Smith</td>
              <td>Excellent work and leadership.</td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>2024-06-28</td>
              <td>4.2</td>
              <td>Mike Johnson</td>
              <td>Consistent and reliable.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Performance;
