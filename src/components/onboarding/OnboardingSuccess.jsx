import { useNavigate } from 'react-router-dom'
import './OnboardingSuccess.css'

function OnboardingSuccess() {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="onboarding-success">
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          
          <div className="success-content">
            <h1>Thank You for Choosing TechPal HRM!</h1>
            <p className="success-message">
              Your onboarding request has been successfully submitted. Our team will review 
              your information and contact you within 24-48 hours to discuss the next steps.
            </p>
            
            <div className="next-steps">
              <h3>What happens next?</h3>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Review & Analysis</h4>
                    <p>Our team will review your requirements and prepare a customized proposal.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Consultation Call</h4>
                    <p>We'll schedule a detailed consultation to discuss your specific needs and timeline.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Implementation Plan</h4>
                    <p>Receive a comprehensive implementation plan tailored to your organization.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Go Live</h4>
                    <p>Begin your journey with TechPal HRM and transform your HR operations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-info">
              <h3>Need immediate assistance?</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>onboarding@techpal.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">💬</div>
                  <div>
                    <h4>Live Chat</h4>
                    <p>Available 24/7 on our website</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button onClick={handleBackToHome} className="btn-primary">
                Back to Home
              </button>
              <button className="btn-secondary">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingSuccess 