import './EventsMeetings.css'

function EventsMeetings() {
  return (
    <div className="events-meetings">
      <div className="events-meetings-header">
        <h2>Events & Meetings</h2>
        <p>View upcoming company events and meetings</p>
      </div>
      <div className="events-meetings-content">
        <h3>Upcoming Events</h3>
        <ul className="events-list">
          <li><strong>All-Hands Meeting</strong> - July 10, 2024, 10:00 AM</li>
          <li><strong>Team Building Retreat</strong> - July 20, 2024, 9:00 AM</li>
          <li><strong>Quarterly Review</strong> - August 1, 2024, 2:00 PM</li>
        </ul>
      </div>
    </div>
  )
}

export default EventsMeetings 