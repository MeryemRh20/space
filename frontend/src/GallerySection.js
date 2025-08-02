import React, { useState } from "react";
import "./App.css";

const services = [
  {
    title: "Open Space",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    desc: "Flexible desks in a vibrant, collaborative environment. High-speed internet, unlimited coffee & tea.",
    link: "#open-space",
    icon: "💼",
    features: ["Flexible Seating", "High-Speed WiFi", "24/7 Access"]
  },
  {
    title: "Cafeteria",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    desc: "Cozy cafeteria with fresh drinks and snacks, perfect for breaks and informal meetings.",
    link: "#cafeteria",
    icon: "☕",
    features: ["Premium Coffee", "Healthy Snacks", "Meeting Space"]
  },
  {
    title: "Private Office",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    desc: "Fully furnished private offices for teams and individuals seeking privacy and comfort.",
    link: "#private-office",
    icon: "🏢",
    features: ["Fully Furnished", "Sound Proof", "Customizable"]
  },
  {
    title: "Knowledge & Training",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "Workshops, training sessions, and events for continuous learning and growth.",
    link: "#training",
    icon: "🎓",
    features: ["Workshops", "Training", "Events"]
  },
  {
    title: "Conference Room",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    desc: "Modern meeting rooms with the latest technology and flexible layouts.",
    link: "#conference-room",
    icon: "📺",
    features: ["AV Equipment", "Flexible Layout", "Booking System"]
  },
  {
    title: "Networking Events",
    img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
    desc: "Connect, collaborate, and expand your network at our regular events.",
    link: "#events",
    icon: "🤝",
    features: ["Networking", "Collaboration", "Community"]
  },
];

export default function GallerySection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="gallery-section">
      <div className="section-header">
        <div className="section-badge">
          <span>Our Spaces</span>
        </div>
        <h2 className="section-title">
          <span className="gradient-text">Discover our</span>
          <br />
          <span>inspiring workspaces</span>
        </h2>
        <p className="section-subtitle">
          Explore our thoughtfully designed spaces that cater to every work style. 
          From collaborative open areas to private offices, we have the perfect environment for your success.
        </p>
      </div>
      
      <div className="gallery-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`gallery-card glass-card ${hoveredCard === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="gallery-image-container">
              <img
                src={service.img}
                alt={service.title}
                className="gallery-image"
              />
              <div className="image-overlay"></div>
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <div className="overlay-icon">{service.icon}</div>
                  <h3 className="overlay-title">{service.title}</h3>
                  <div className="overlay-features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-content">
              <div className="content-header">
                <div className="content-icon">
                  <span>{service.icon}</span>
                </div>
                <h3 className="gallery-title">{service.title}</h3>
              </div>
              <p className="gallery-description">{service.desc}</p>
              <div className="gallery-features">
                {service.features.map((feature, i) => (
                  <span key={i} className="feature-badge">{feature}</span>
                ))}
              </div>
              <a href={service.link} className="btn btn-primary glass-button">
                <span>Explore Space</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="button-glow"></div>
              </a>
            </div>
            
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
      
      
          
    </div>
  );
}
