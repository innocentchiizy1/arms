import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "./OnboardingForm.css";

function OnboardingForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Contact Person Information
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    contactRole: "",

    // HR Requirements
    currentHRSystem: "",
    employeeCount: "",
    expectedGrowth: "",
    primaryNeeds: [],
    implementationTimeline: "",
    budget: "",

    // Additional Information
    additionalNotes: "",
    preferredContactMethod: "email",
    bestTimeToContact: "morning",

    // New fields for backend
    firstName: "",
    lastName: "",
    staffId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedNeeds = checked
        ? [...formData.primaryNeeds, value]
        : formData.primaryNeeds.filter((need) => need !== value);

      setFormData({
        ...formData,
        primaryNeeds: updatedNeeds,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Map formData to backend structure
    const payload = {
      name: formData.companyName,
      industry: formData.industry,
      sizeCategory: formData.companySize,
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country,
      },
      contactInfo: {
        phone: formData.phone,
        email: formData.contactEmail,
        website: formData.website,
      },
      settings: {
        timezone: formData.timezone || '',
        currency: formData.currency || '',
      },
      firstName: formData.firstName || formData.contactName.split(' ')[0] || '',
      lastName: formData.lastName || formData.contactName.split(' ')[1] || '',
      email: formData.contactEmail,
      staffId: formData.staffId || '',
      // Optionally add more fields if needed
    };

    try {
      await apiService.submitCompanyOnboarding(payload);
      navigate("/onboarding/success");
    } catch (err) {
      console.error("Onboarding submission failed:", err);
      setError(err.message || "Failed to submit onboarding request. Please try again.");
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Company Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry *</label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="education">Education</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="companySize">Company Size *</label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.yourcompany.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP/Postal Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Primary Contact Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="contactName">Contact Name *</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactTitle">Job Title *</label>
          <input
            type="text"
            id="contactTitle"
            name="contactTitle"
            value={formData.contactTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Email Address *</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Phone Number</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactRole">Role in Organization *</label>
          <select
            id="contactRole"
            name="contactRole"
            value={formData.contactRole}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="hr-manager">HR Manager</option>
            <option value="hr-director">HR Director</option>
            <option value="ceo">CEO</option>
            <option value="md">Managing Director</option>
            <option value="operations-manager">Operations Manager</option>
            <option value="it-manager">IT Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>HR Requirements & Current State</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="currentHRSystem">Current HR System</label>
          <select
            id="currentHRSystem"
            name="currentHRSystem"
            value={formData.currentHRSystem}
            onChange={handleChange}
          >
            <option value="">Select Current System</option>
            <option value="none">No HR System</option>
            <option value="manual">Manual/Spreadsheets</option>
            <option value="bamboo">BambooHR</option>
            <option value="workday">Workday</option>
            <option value="gusto">Gusto</option>
            <option value="zenefits">Zenefits</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employeeCount">Number of Employees</label>
          <input
            type="number"
            id="employeeCount"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedGrowth">Expected Growth (12 months)</label>
          <select
            id="expectedGrowth"
            name="expectedGrowth"
            value={formData.expectedGrowth}
            onChange={handleChange}
          >
            <option value="">Select Growth</option>
            <option value="0-10%">0-10%</option>
            <option value="11-25%">11-25%</option>
            <option value="26-50%">26-50%</option>
            <option value="51-100%">51-100%</option>
            <option value="100%+">100%+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="implementationTimeline">
            Implementation Timeline
          </label>
          <select
            id="implementationTimeline"
            name="implementationTimeline"
            value={formData.implementationTimeline}
            onChange={handleChange}
          >
            <option value="">Select Timeline</option>
            <option value="immediate">Immediate (1-2 months)</option>
            <option value="quarter">This Quarter</option>
            <option value="next-quarter">Next Quarter</option>
            <option value="next-year">Next Year</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Primary HR Needs (Select all that apply)</label>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="employee-management"
              checked={formData.primaryNeeds.includes("employee-management")}
              onChange={handleChange}
            />
            Employee Management
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="payroll"
              checked={formData.primaryNeeds.includes("payroll")}
              onChange={handleChange}
            />
            Payroll Processing
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="time-attendance"
              checked={formData.primaryNeeds.includes("time-attendance")}
              onChange={handleChange}
            />
            Time & Attendance
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="leave-management"
              checked={formData.primaryNeeds.includes("leave-management")}
              onChange={handleChange}
            />
            Leave Management
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="performance"
              checked={formData.primaryNeeds.includes("performance")}
              onChange={handleChange}
            />
            Performance Management
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="recruitment"
              checked={formData.primaryNeeds.includes("recruitment")}
              onChange={handleChange}
            />
            Recruitment & Onboarding
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="training"
              checked={formData.primaryNeeds.includes("training")}
              onChange={handleChange}
            />
            Training & Development
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="primaryNeeds"
              value="analytics"
              checked={formData.primaryNeeds.includes("analytics")}
              onChange={handleChange}
            />
            HR Analytics & Reporting
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>Additional Information & Preferences</h3>

      <div className="form-group">
        <label htmlFor="additionalNotes">
          Additional Notes or Requirements
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows="4"
          placeholder="Tell us about any specific requirements, challenges, or questions you have..."
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="preferredContactMethod">
            Preferred Contact Method
          </label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="video-call">Video Call</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bestTimeToContact">Best Time to Contact</label>
          <select
            id="bestTimeToContact"
            name="bestTimeToContact"
            value={formData.bestTimeToContact}
            onChange={handleChange}
          >
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - 8 PM)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="budget">Budget Range (Optional)</label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        >
          <option value="">Select Budget Range</option>
          <option value="under-5k">Under $5,000/year</option>
          <option value="5k-10k">$5,000 - $10,000/year</option>
          <option value="10k-25k">$10,000 - $25,000/year</option>
          <option value="25k-50k">$25,000 - $50,000/year</option>
          <option value="50k+">$50,000+/year</option>
          <option value="discuss">Let's discuss</option>
        </select>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  // Progress steps for vertical bar
  const steps = [
    { label: 'Company Info' },
    { label: 'Contact Info' },
    { label: 'Requirements' },
    { label: 'Additional' },
  ]

  return (
    <div className="onboarding-form-container">
      <div className="onboarding-form-layout">
        <div className="onboarding-form-illustration">
          <div className="illustration-icon">🚀</div>
          <h2>Welcome to TechPal HRM</h2>
          <p>
            Start your journey with a modern HRM platform. Complete this quick onboarding to get your company set up in minutes!
          </p>
        </div>
        <div className="form-wrapper">
          <div className="form-header">
            <div className="logo-section">
              <div className="logo">🚀</div>
              <h1>TechPal HRM Onboarding</h1>
            </div>
            <p>Let's get you started with TechPal HRM</p>
          </div>
          <div className="progress-bar">
            {steps.map((step, idx) => (
              <div
                key={step.label}
                className={`progress-step${currentStep === idx + 1 ? ' active' : ''}`}
              >
                <div className="step-number">{idx + 1}</div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="onboarding-form">
            {error && <div className="error-message">{error}</div>}
            {renderStepContent()}
            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary">
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button type="button" onClick={nextStep} className="btn-primary">
                  Next
                </button>
              ) : (
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Onboarding Request'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OnboardingForm;
