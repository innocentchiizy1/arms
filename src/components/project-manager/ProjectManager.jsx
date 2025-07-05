import './ProjectManager.css'

function ProjectManager() {
  return (
    <div className="project-manager">
      <div className="project-manager-header">
        <h2>Project Manager</h2>
        <p>Track and manage company projects</p>
      </div>
      <div className="project-manager-content">
        <h3>Active Projects</h3>
        <ul className="project-list">
          <li><strong>HRM Portal Redesign</strong> - Due: 2024-08-01</li>
          <li><strong>Mobile App Launch</strong> - Due: 2024-09-15</li>
          <li><strong>Annual Report</strong> - Due: 2024-10-01</li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectManager 