import React, { useState } from "react";
import "./App.css";

export default function LocationSection() {
  const [isMapHovered, setIsMapHovered] = useState(false);

  const locationFeatures = [
    
  ];

  return (
    <div className="location-section">
      <div className="section-header">
        <div className="section-badge">
          <span>Location</span>
        </div>
        <h2 className="section-title">
          <span className="gradient-text">Visit us in the</span>
          <br />
          <span>heart of Rabat</span>
        </h2>
        <p className="section-subtitle">
          Located in the heart of Rabat, our workspace is easily accessible and surrounded by great amenities. 
          Come experience the Workbeat community for yourself.
        </p>
      </div>
      
      <div className="location-content">
        <div className="location-info glass-card">
          <div className="info-header">
            <div className="location-icon">
              <span>🏢</span>
            </div>
            <h3 className="info-title">Find Us</h3>
          </div>
          
          <div className="info-details">
            <div className="detail-item">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <h4>Address</h4>
                <p>123 Avenue du Progrès<br />Rabat, Morocco</p>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-icon">🕒</div>
              <div className="detail-content">
                <h4>Operating Hours</h4>
                <p>
                  Monday - Friday: 8:00 AM - 8:00 PM<br />
                  Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-icon">📞</div>
              <div className="detail-content">
                <h4>Contact</h4>
                <p>
                  Phone: +212 5 37 123 456<br />
                  Email: hello@workbeat.ma
                </p>
              </div>
            </div>
          </div>
          
          <div className="location-features">
            {locationFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <a href="#contact" className="btn btn-primary glass-button">
            <span>Book a Tour</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="button-glow"></div>
          </a>
        </div>
        
        <div 
          className={`location-map glass-card ${isMapHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsMapHovered(true)}
          onMouseLeave={() => setIsMapHovered(false)}
        >
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-6.8494!3d34.0209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzE1LjIiTiA2wrA1MCc1Ny44Ilc!5e0!3m2!1sen!2sma!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Workbeat Location in Rabat"
            ></iframe>
            <div className="map-overlay">
              <div className="overlay-content">
                <div className="overlay-icon">📍</div>
                <h4>Central Rabat</h4>
                <p>Easy to find, easy to reach</p>
              </div>
            </div>
          </div>
          
          <div className="map-info">
            <div className="map-badge">
              <span>📍 Central Location</span>
            </div>
            <div className="map-stats">
              <div className="stat">
                <span className="stat-number">5min</span>
                <span className="stat-label">from tram</span>
              </div>
              <div className="stat">
                <span className="stat-number">10min</span>
                <span className="stat-label">from center</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
          </div>
        
   
    
  );
}