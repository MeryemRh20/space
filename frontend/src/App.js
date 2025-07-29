import React, { useState } from 'react';
import './App.css';
import './index.css';

import GallerySection from './GallerySection';
import LocationSection from './LocationSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard';
import BookSpacePage from './BookSpacePage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EditBookingPage from './EditBookingPage';
import AdminDashboard from './AdminDashboard';

function AppContent() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-left">
          <svg width="32" height="20" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
            <polyline points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" stroke="#21c87a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text" style={{fontWeight: '700', color: '#111', fontSize: '1.3rem', fontFamily: 'inherit', marginLeft: '0.5rem'}}>Workbeat</span>
        </div>
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
          <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
          <li><a href="#pricing" onClick={closeMobileMenu}>Pricing</a></li>
          <li><a href="#gallery" onClick={closeMobileMenu}>Spaces</a></li>
          <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
        </ul>
        <button className="book-tour" onClick={() => navigate('/login')}>Connect</button>
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <section id="hero" className="hero-section">
      <div className="hero-illustration" aria-label="coworking-illustration">
        <img
  className="hero-img"
  src={require('./assets/hero-illustration.png')}
  alt="Coworking space illustration"
  style={{ width: '100%' }}
/>
      </div>
      <div className="hero-content">
        <h1>Elevate Your Workday</h1>
        <p>Join a community of innovators and creators in a workspace designed for success.</p>
        <div className="hero-buttons">
          <a href="#gallery" className="explore-btn">Explore Spaces</a>
          <button className="showmore-btn">Book a tour</button>
        </div>
      </div>
    </section>

    {/* Welcome Section */}
    <section id="about" className="welcome-section">
      <h2>Welcome to Workbeat</h2>
      <p className="welcome-desc">
        Workbeat is more than just a workspace—it's a hub for creativity, collaboration, and innovation in Rabat. Whether you're a freelancer, startup, or growing business, our inspiring environment and vibrant community help you achieve your goals every day.
      </p>
      <div className="feature-cards">
        <div className="feature-card">
          <span className="feature-icon" aria-label="Flexible Desks"><img src="https://cdn-icons-png.flaticon.com/128/3135/3135767.png" alt="Desk Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <span className="feature-title">Flexible Desks & Private Offices</span>
        </div>
        <div className="feature-card">
          <span className="feature-icon" aria-label="Events"><img src="https://cdn-icons-png.flaticon.com/128/747/747310.png" alt="Calendar Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <span className="feature-title">Events, Workshops & Networking</span>
        </div>
        <div className="feature-card">
          <span className="feature-icon" aria-label="Amenities"><img src="https://cdn-icons-png.flaticon.com/128/616/616489.png" alt="Star Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <span className="feature-title">Premium Amenities & Community</span>
        </div>
      </div>
      
    </section>

    {/* Our Services Section */}
    <section id="services" className="services-section">
      <h2>Our Services</h2>
      <div className="services-cards">
        <div className="service-card">
          <span className="service-icon" aria-label="Flexible Spaces"><img src="https://cdn-icons-png.flaticon.com/128/3069/3069171.png" alt="Office Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <div>
            <div className="service-title">Flexible Spaces</div>
            <div className="service-desc">Shared desks, meeting rooms, open spaces or private pods — choose your vibe every day.</div>
          </div>
        </div>
        <div className="service-card">
          <span className="service-icon" aria-label="High-Speed Internet"><img src="https://cdn-icons-png.flaticon.com/128/483/483408.png" alt="Wifi Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <div>
            <div className="service-title">High-Speed Internet</div>
            <div className="service-desc">Ultra-fast and secure connection for all your professional needs, video calls, and cloud access.</div>
          </div>
        </div>
        <div className="service-card">
          <span className="service-icon" aria-label="Vibrant Community"><img src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" alt="Team Icon by Freepik" style={{width:'48px',height:'48px'}}/></span>
          <div>
            <div className="service-title">Vibrant Community</div>
            <div className="service-desc">Events, workshops, afterworks, and networking to boost your opportunities.</div>
          </div>
        </div>
        
      </div>
    </section>

    {/* Pricing Section */}
    <section id="pricing" className="pricing-section">
      <h2>Our Offers</h2>
      <div className="pricing-cards">
        {/* Open Space */}
        <div className="pricing-card">
          <div className="pricing-type">Open Space</div>
          <div className="pricing-value-row">
            <span className="pricing-value">25dh</span><span className="pricing-unit">/hour</span>
          </div>
          <button className="pricing-btn" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</button>
          <ul className="pricing-features">
            <li>Flexible desk in open area</li>
            <li>High-speed internet</li>
            <li>20 pages/month printing</li>
            <li>40% off hot/cold drinks</li>
            <li>Access to community events</li>
          </ul>
        </div>
        {/* Small Office */}
        <div className="pricing-card">
          <div className="pricing-type">Small Office <span className="popular-badge">Most Popular</span></div>
          <div className="pricing-value-row">
            <span className="pricing-value">100dh</span><span className="pricing-unit">/week</span>
          </div>
          <button className="pricing-btn" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</button>
          <ul className="pricing-features">
            <li>Private furnished office</li>
            <li>8h/month conference room access</li>
            <li>40 pages/month printing</li>
            <li>40% off hot/cold drinks</li>
            <li>Includes all Open Space benefits</li>
          </ul>
        </div>
        {/* Standard Office */}
        <div className="pricing-card">
          <div className="pricing-type">Standard Office</div>
          <div className="pricing-value-row">
            <span className="pricing-value">200dh</span><span className="pricing-unit">/week</span>
          </div>
          <button className="pricing-btn" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</button>
          <ul className="pricing-features">
            <li>Larger private office</li>
            <li>8h/month conference room access</li>
            <li>40 pages/month printing</li>
            <li>40% off hot/cold drinks</li>
            <li>Includes all Small Office benefits</li>
          </ul>
        </div>
      </div>
    </section>
    {/* Gallery Section */}
    <section id="gallery"><GallerySection /></section>
    {/* Location Section */}
    <LocationSection />
    {/* Contact Section */}
    <section id="contact"><ContactSection titleStyle={{color: '#fc651f'}} /></section>
    {/* Footer */}
    <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/book-space" element={<BookSpacePage />} />
<Route path="/edit-booking/:bookingId" element={<EditBookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;


