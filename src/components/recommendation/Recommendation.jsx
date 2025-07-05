import "./Recommendation.css";

function Recommendation() {
  return (
    <div className="recommendation">
      <div className="recommendation-header">
        <h2>Recommendation</h2>
        <p>Manage employee recommendations and referrals</p>
      </div>
      <div className="recommendation-content">
        <h3>Submit a Recommendation</h3>
        <form className="recommendation-form">
          <div className="form-group">
            <label>Employee Name</label>
            <input type="text" placeholder="Enter employee name" />
          </div>
          <div className="form-group">
            <label>Recommendation</label>
            <textarea
              placeholder="Write your recommendation..."
              rows={4}
            ></textarea>
          </div>
          <button className="submit-btn">Submit</button>
        </form>
        <h3>Recent Recommendations</h3>
        <ul className="recommendation-list">
          <li>
            <strong>Jane Smith</strong>: "Alice is a dedicated and reliable team
            member!"
          </li>
          <li>
            <strong>John Doe</strong>: "Mike consistently exceeds expectations."
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Recommendation;
