import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "./OnboardingForm.css";

// Example data
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Other",
];
const companySizes = [
  { value: "startup", label: "Startup (1-10)" },
  { value: "small", label: "Small (11-50)" },
  { value: "medium", label: "Medium (51-250)" },
  { value: "large", label: "Large (251+)" },
];
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "NG", name: "Nigeria" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
];
const statesByCountry = {
  US: ["California", "New York", "Texas", "Florida", "Illinois"],
  CA: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  NG: ["Lagos", "Abuja", "Kano", "Rivers"],
  IN: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"],
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
};
const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Africa/Lagos",
  "Asia/Kolkata",
  "Europe/Paris",
];
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "INR", name: "Indian Rupee" },
  { code: "GBP", name: "British Pound" },
  { code: "EUR", name: "Euro" },
];

function OnboardingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    sizeCategory: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    contactInfo: {
      phone: "",
      email: "",
      website: "",
    },
    settings: {
      timezone: "",
      currency: "",
    },
    firstName: "",
    lastName: "",
    email: "",
    staffId: "",
    password: "",
  });

  // Get states for selected country
  const selectedCountryCode = countries.find(
    (c) => c.name === formData.address.country
  )?.code;
  const stateOptions = selectedCountryCode
    ? statesByCountry[selectedCountryCode] || []
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      let updatedAddress = { ...formData.address, [key]: value };
      // If country changes, reset state
      if (key === "country") {
        updatedAddress.state = "";
      }
      setFormData({
        ...formData,
        address: updatedAddress,
      });
    } else if (name.startsWith("contactInfo.")) {
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name.startsWith("settings.")) {
      setFormData({
        ...formData,
        settings: {
          ...formData.settings,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiService.submitCompanyOnboarding(formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.message || "Failed to submit onboarding request. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-form-bg">
      <div className="onboarding-hero">
        <div className="hero-icon">🚀</div>
        <h1>Welcome to TechPal HRM</h1>
        <div className="hero-desc">
          Start your journey with a modern HRM platform.
          <br />
          Complete this quick onboarding to get your company set up in minutes!
        </div>
      </div>
      <div className="onboarding-form-card">
        <div className="onboarding-progress">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: "100%" }}></div>
          </div>
        </div>
        <h2>Onboard Your Company</h2>
        <div className="subtitle">
          Fill out the form to get started with TechPal HRM
        </div>
        <form
          onSubmit={handleSubmit}
          className="onboarding-form"
          autoComplete="off"
        >
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="name">Company Name *</label>
          </div>
          <div className="form-group">
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Industry
              </option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <label htmlFor="industry">Industry *</label>
          </div>
          <div className="form-group">
            <select
              id="sizeCategory"
              name="sizeCategory"
              value={formData.sizeCategory}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Company Size
              </option>
              {companySizes.map((sz) => (
                <option key={sz.value} value={sz.value}>
                  {sz.label}
                </option>
              ))}
            </select>
            <label htmlFor="sizeCategory">Company Size *</label>
          </div>
         
          <div className="form-group">
            <select
              id="address.country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <label htmlFor="address.country">Country *</label>
          </div>
          <div className="form-group">
            <select
              id="address.state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required={!!formData.address.country}
              disabled={!formData.address.country}
            >
              <option value="" disabled>
                {formData.address.country
                  ? "Select State/Province"
                  : "Select Country First"}
              </option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <label htmlFor="address.state">State/Province *</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="address.street">Street</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="address.city">City</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address.zip"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="address.zip">ZIP</label>
          </div>
          <div className="form-group">
            <select
              id="settings.timezone"
              name="settings.timezone"
              value={formData.settings.timezone}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Timezone
              </option>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            <label htmlFor="settings.timezone">Timezone *</label>
          </div>
          <div className="form-group">
            <select
              id="settings.currency"
              name="settings.currency"
              value={formData.settings.currency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Currency
              </option>
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name}
                </option>
              ))}
            </select>
            <label htmlFor="settings.currency">Currency *</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="contactInfo.phone"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="contactInfo.phone">Phone</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="contactInfo.email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="contactInfo.email">Contact Email</label>
          </div>
          <div className="form-group">
            <input
              type="url"
              id="contactInfo.website"
              name="contactInfo.website"
              value={formData.contactInfo.website}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="contactInfo.website">Website</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email *</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password *</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="staffId">Staff ID</label>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Onboarding Request"}
          </button>
        </form>
      </div>
      <footer className="onboarding-footer-simple">TechPal © 2025</footer>
    </div>
  );
}

export default OnboardingForm;
