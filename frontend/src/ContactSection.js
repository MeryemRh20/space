import React, { useState } from "react";
import "./App.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: "📍",
      title: "Visit Us",
      description: "123 Avenue du Progrès, Rabat, Morocco",
      action: "Get Directions"
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "+212 5 37 123 456",
      action: "Call Now"
    },
    {
      icon: "✉️",
      title: "Email Us",
      description: "hello@workbeat.ma",
      action: "Send Email"
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" }
  ];

  return (
    <div className="contact-section">
      <div className="section-header">
        <div className="section-badge">
          <span>Contact Us</span>
        </div>
        <h2 className="section-title">
          <span className="gradient-text">Get in touch</span>
          <br />
          <span>with our team</span>
        </h2>
        <p className="section-subtitle">
          Ready to join the Workbeat community? Have questions about our spaces or services? 
          We'd love to hear from you and help you find the perfect workspace solution.
        </p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form glass-card">
          <div className="form-header">
            <div className="form-icon">
              <span>💬</span>
            </div>
            <h3 className="form-title">Send us a message</h3>
            <p className="form-subtitle">We'll get back to you within 24 hours</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="input-icon"></div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="input-icon"></div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <div className="input-container">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                  <div className="input-icon"></div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="company" className="form-label">Company</label>
                <div className="input-container">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your company name"
                  />
                  <div className="input-icon"></div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <div className="input-container">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                  placeholder="Tell us about your needs..."
                  required
                ></textarea>
                <div className="input-icon textarea-icon"></div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary btn-large glass-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                  <div className="loading-spinner"></div>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="button-glow"></div>
                </>
              )}
            </button>
            
            {isSubmitted && (
              <div className="contact-success glass-card">
                <div className="success-icon"></div>
                <div className="success-content">
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="contact-info">
          
          
          <div className="contact-methods">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method glass-card">
                <div className="method-icon">
                  <span>{method.icon}</span>
                </div>
                <div className="method-content">
                  <h4>{method.title}</h4>
                  <p>{method.description}</p>
                  <a href="#" className="method-action">{method.action}</a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="business-hours glass-card">
            <h4>Business Hours</h4>
            <div className="hours-grid">
              <div className="hours-item">
                <span className="day">Monday - Friday</span>
                <span className="time">8:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Saturday</span>
                <span className="time">9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Sunday</span>
                <span className="time">Closed</span>
              </div>
            </div>
          </div>
          
          
          
        </div>
      </div>
    </div>
  );
}
