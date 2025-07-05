import "./Training.css";

function Training() {
  return (
    <div className="training">
      <div className="training-header">
        <h2>Training</h2>
        <p>Manage employee training programs and sessions</p>
      </div>
      <div className="training-content">
        <h3>Upcoming Training Programs</h3>
        <ul className="training-list">
          <li>
            <strong>React Fundamentals</strong> - July 10, 2024
          </li>
          <li>
            <strong>Leadership Skills</strong> - July 15, 2024
          </li>
          <li>
            <strong>Workplace Safety</strong> - July 20, 2024
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Training;
