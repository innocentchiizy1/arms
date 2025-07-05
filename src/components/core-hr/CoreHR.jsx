import "./CoreHR.css";

function CoreHR() {
  return (
    <div className="core-hr">
      <div className="core-hr-header">
        <h2>Core HR</h2>
        <p>Access HR policies, employee handbook, and resources</p>
      </div>
      <div className="core-hr-content">
        <div className="hr-section">
          <h3>HR Policies</h3>
          <ul>
            <li>Attendance & Leave Policy</li>
            <li>Code of Conduct</li>
            <li>Remote Work Policy</li>
            <li>Equal Opportunity Policy</li>
            <li>Health & Safety Policy</li>
          </ul>
        </div>
        <div className="hr-section">
          <h3>Employee Handbook</h3>
          <p>
            Download the latest <a href="#">Employee Handbook (PDF)</a> for a
            comprehensive guide to company culture, benefits, and expectations.
          </p>
        </div>
        <div className="hr-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">HR Contacts</a>
            </li>
            <li>
              <a href="#">Request Leave</a>
            </li>
            <li>
              <a href="#">Submit Grievance</a>
            </li>
            <li>
              <a href="#">Payroll FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoreHR;
