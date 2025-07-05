import { useNavigate } from "react-router-dom";
import "./OnboardingLanding.css";

function OnboardingLanding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/onboarding/form");
  };

  return (
    <div className="onboarding-landing">
      <div className="landing-container">
        <div className="landing-header">
          <div className="logo-section">
            <div className="logo">🚀</div>
            <h1>TechPal HRM</h1>
          </div>
          <p className="tagline">Transform Your HR Management</p>
        </div>

        <div className="landing-content">
          <div className="hero-section">
            <h2>Welcome to TechPal HRM Portal</h2>
            <p className="hero-description">
              Streamline your human resources management with our comprehensive
              HRM solution designed for modern organizations.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Employee Management</h3>
              <p>
                Complete employee lifecycle management from onboarding to
                offboarding
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics & Reports</h3>
              <p>
                Powerful insights and reporting for data-driven HR decisions
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Time & Attendance</h3>
              <p>Automated time tracking and attendance management</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Payroll Management</h3>
              <p>Streamlined payroll processing and benefits administration</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Leave Management</h3>
              <p>Efficient leave request and approval workflows</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Performance Tracking</h3>
              <p>Comprehensive performance evaluation and goal setting</p>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to Get Started?</h3>
            <p>Join thousands of organizations already using TechPal HRM</p>
            <button className="cta-button" onClick={handleGetStarted}>
              Start Onboarding with TechPal
            </button>
          </div>
        </div>

        <div className="landing-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>For HR Professionals</h4>
              <p>
                Streamline your HR processes and focus on what matters most -
                your people.
              </p>
            </div>
            <div className="footer-section">
              <h4>For CEOs & MDs</h4>
              <p>
                Get real-time insights into your organization's human capital
                and make informed decisions.
              </p>
            </div>
            <div className="footer-section">
              <h4>For Organizations</h4>
              <p>
                Scale your HR operations efficiently as your business grows.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TechPal HRM. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLanding;
