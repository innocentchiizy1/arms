import './Header.css'

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>HRM Portal</h1>
        </div>
        
        <div className="header-right">
          <div className="user-menu">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 