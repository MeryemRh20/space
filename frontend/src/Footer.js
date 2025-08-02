import React, { useState } from "react";
import "./App.css";

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Mission", href: "#mission" },
      { name: "Team", href: "#team" },
      { name: "Careers", href: "#careers" }
    ],
    services: [
      { name: "Coworking Spaces", href: "#spaces" },
      { name: "Private Offices", href: "#offices" },
      { name: "Meeting Rooms", href: "#meetings" },
      { name: "Virtual Office", href: "#virtual" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "FAQ", href: "#faq" },
      { name: "Support", href: "#support" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#", color: "#1877F2" },
    { name: "Twitter", icon: "🐦", url: "#", color: "#1DA1F2" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "#0077B5" },
    { name: "Instagram", icon: "📷", url: "#", color: "#E4405F" }
  ];

  const stats = [
    { number: "500+", label: "Happy Members" },
    { number: "50+", label: "Events Hosted" },
    { number: "24/7", label: "Support" },
    { number: "100%", label: "Satisfaction" }
  ];

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-gradient"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="footer-brand glass-card">
              <div className="brand-container">
                <svg className="footer-logo" width="40" height="40" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
                <div className="brand-text">
                  <h3 className="brand-name">Workbeat</h3>
                  <p className="brand-tagline">The future of work starts here</p>
                </div>
              </div>
              <p className="brand-description">
                Join the most vibrant coworking community in Rabat. 
                Where innovation meets collaboration, and success becomes inevitable.
              </p>
              <div className="brand-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>

          <div className="footer-links">
            <div className="links-section">
              <h4 className="section-title">Company</h4>
              <ul className="links-list">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <span>{link.name}</span>
                      <div className="link-underline"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-section">
              <h4 className="section-title">Services</h4>
              <ul className="links-list">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <span>{link.name}</span>
                      <div className="link-underline"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-section">
              <h4 className="section-title">Support</h4>
              <ul className="links-list">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <span>{link.name}</span>
                      <div className="link-underline"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-section">
              <h4 className="section-title">Legal</h4>
              <ul className="links-list">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <span>{link.name}</span>
                      <div className="link-underline"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} <strong>Workbeat</strong>. Made with 
              <span className="heart">♥</span> in Rabat, Morocco
            </p>
          </div>
          <div className="footer-actions">
            <a href="#privacy" className="action-link">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms" className="action-link">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#cookies" className="action-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
