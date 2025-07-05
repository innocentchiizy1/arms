import "./Assets.css";

function Assets() {
  return (
    <div className="assets">
      <div className="assets-header">
        <h2>Assets</h2>
        <p>Manage company assets and inventory</p>
      </div>
      <div className="assets-content">
        <h3>Asset Inventory</h3>
        <table className="assets-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AST-001</td>
              <td>MacBook Pro</td>
              <td>Laptop</td>
              <td>In Use</td>
              <td>Alice Nguyen</td>
            </tr>
            <tr>
              <td>AST-002</td>
              <td>Office Chair</td>
              <td>Furniture</td>
              <td>Available</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assets;
