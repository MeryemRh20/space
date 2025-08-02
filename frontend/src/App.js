import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Navigation */}
      <nav className={`navbar glass-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#hero" className="navbar-brand">
            <div className="logo-container">
            <svg className="navbar-logo" width="32" height="32" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
              <span className="brand-text">Workbeat</span>
            </div>
          </a>
          
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#hero" className="navbar-link" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#features" className="navbar-link" onClick={closeMobileMenu}>Features</a></li>
            <li><a href="#services" className="navbar-link" onClick={closeMobileMenu}>Services</a></li>
            <li><a href="#pricing" className="navbar-link" onClick={closeMobileMenu}>Pricing</a></li>
            <li><a href="#gallery" className="navbar-link" onClick={closeMobileMenu}>Spaces</a></li>
            <li><a href="#contact" className="navbar-link" onClick={closeMobileMenu}>Contact</a></li>
        </ul>
          
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <a href="/login" className="navbar-cta glass-button" onClick={() => navigate('/login')}>
              <span>Connect</span>
              <div className="button-glow"></div>
            </a>
          </div>
          
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="particle-container">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Welcome to the future of work</span>
            </div>
            
            <h1 className="hero-title">
              <span className="gradient-text">The best coworking</span>
              <br />
              <span className="hero-title-secondary">in Rabat</span>
            </h1>
            
            <p className="hero-description">
              Experience a workspace designed for productivity, creativity, and collaboration. 
              Join a community of innovators, entrepreneurs, and professionals who choose to work differently.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Monthly Visitors</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Events Hosted</div>
              </div>
            </div>
            
            <div className="hero-buttons">
              <a href="#gallery" className="btn btn-primary btn-large glass-button">
                <span>Explore Spaces</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="button-glow"></div>
              </a>
              <a href="#contact" className="btn btn-secondary btn-large">
                <span>Book a Tour</span>
                <div className="ripple-effect"></div>
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-container">
            <img
              src={require('./assets/hero-coworking-space.jpg')}
              alt="Modern coworking space in Rabat"
                className="hero-image"
              />
              <div className="image-overlay"></div>
            </div>
        </div>
      </div>
        
        
    </section>

      {/* Features Section */}
      <section id="features" className="features section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <span>Why Choose Us</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Everything you need</span>
              <br />
              <span>to succeed</span>
            </h2>
            <p className="section-subtitle">
              Workbeat is more than just a workspace—it's a hub for creativity, collaboration, and innovation. 
              We provide the tools, community, and environment you need to thrive.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20H4V4H10V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20H14V12H20V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 8H14V4H20V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Flexible Workspaces</h3>
              <p className="feature-description">
                Choose from open spaces, dedicated desks, or private offices that adapt to your work style and team size.
              </p>
              <div className="feature-highlight">
                <span>24/7 Access</span>
              </div>
            </div>
            
            <div className="feature-card glass-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V3H7V21L12 16L17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Events & Networking</h3>
              <p className="feature-description">
                Join our regular events, workshops, and networking sessions to grow your skills and connections.
              </p>
              <div className="feature-highlight">
                <span>Monthly Events</span>
              </div>
            </div>
            
            <div className="feature-card glass-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Premium Amenities</h3>
              <p className="feature-description">
                Enjoy high-speed internet, meeting rooms, printing services, and a supportive community of professionals.
              </p>
              <div className="feature-highlight">
                <span>All Inclusive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>Our Services</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Complete workspace</span>
              <br />
              <span>solutions</span>
            </h2>
            <p className="section-subtitle">
              We provide everything you need to focus on what matters most—your work. 
              From high-speed internet to vibrant community events, we've got you covered.
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card glass-card">
              <div className="service-icon">
                <div className="icon-container">
                  <img src="https://cdn-icons-png.flaticon.com/128/3069/3069171.png" alt="Office Icon" />
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-title">Flexible Spaces</h3>
                <p className="service-description">
                  Shared desks, meeting rooms, open spaces or private pods — choose your vibe every day.
                </p>
                <div className="service-features">
                  <span>Hot Desks</span>
                  <span>Private Offices</span>
                  <span>Meeting Rooms</span>
                </div>
              </div>
            </div>
            
            <div className="service-card glass-card">
              <div className="service-icon">
                <div className="icon-container">
                  <img src="https://cdn-icons-png.flaticon.com/128/483/483408.png" alt="Wifi Icon" />
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-title">High-Speed Internet</h3>
                <p className="service-description">
                  Ultra-fast and secure connection for all your professional needs, video calls, and cloud access.
                </p>
                <div className="service-features">
                  <span>1Gbps Speed</span>
                  <span>Secure Network</span>
                  <span>24/7 Support</span>
                </div>
          </div>
        </div>
            
            <div className="service-card glass-card">
              <div className="service-icon">
                <div className="icon-container">
                  <img src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" alt="Team Icon" />
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-title">Vibrant Community</h3>
                <p className="service-description">
                  Events, workshops, afterworks, and networking to boost your opportunities and connections.
                </p>
                <div className="service-features">
                  <span>Networking</span>
                  <span>Workshops</span>
                  <span>Events</span>
              </div>
              </div>
            </div>
            
            
            
          
          </div>
      </div>
    </section>

    {/* Pricing Section */}
      <section id="pricing" className="pricing section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>Pricing Plans</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Choose your perfect</span>
              <br />
              <span>workspace plan</span>
            </h2>
            <p className="section-subtitle">
              Flexible pricing options designed to fit your needs. All plans include access to our community events and premium amenities.
            </p>
          </div>
          
          <div className="pricing-grid">
            <div className="pricing-card glass-card">
              <div className="pricing-header">
              <h3 className="pricing-name">Open Space</h3>
              <div className="pricing-price">
                <span className="pricing-amount">25dh</span>
                <span className="pricing-period">/hour</span>
          </div>
              </div>
              <div className="pricing-features">
                <div className="feature-item">✓ Flexible desk</div>
                <div className="feature-item">✓ High-speed internet</div>
                <div className="feature-item">✓ 20 pages/month printing</div>
                <div className="feature-item">✓ 40% off drinks</div>
              </div>
              <button className="btn btn-primary glass-button" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started
              </button>
        </div>
            
            <div className="pricing-card glass-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
              <h3 className="pricing-name">Small Office</h3>
              <div className="pricing-price">
                <span className="pricing-amount">100dh</span>
                <span className="pricing-period">/week</span>
          </div>
              </div>
              <div className="pricing-features">
                <div className="feature-item">✓ Private office</div>
                <div className="feature-item">✓ Conference room access</div>
                <div className="feature-item">✓ 40 pages/month printing</div>
                <div className="feature-item">✓ All Open Space benefits</div>
              </div>
              <button className="btn btn-primary glass-button" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started
              </button>
        </div>
            
            <div className="pricing-card glass-card">
              <div className="pricing-header">
              <h3 className="pricing-name">Standard Office</h3>
              <div className="pricing-price">
                <span className="pricing-amount">200dh</span>
                <span className="pricing-period">/week</span>
          </div>
              </div>
              <div className="pricing-features">
                <div className="feature-item">✓ Larger office</div>
                <div className="feature-item">✓ Conference room access</div>
                <div className="feature-item">✓ 40 pages/month printing</div>
                <div className="feature-item">✓ All Small Office benefits</div>
              </div>
              <button className="btn btn-primary glass-button" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started
              </button>
            </div>
        </div>
      </div>
    </section>

    {/* Gallery Section */}
      <section id="gallery" className="gallery section">
        <div className="container">
          <GallerySection />
        </div>
      </section>

    {/* Location Section */}
      <section id="location" className="location section">
        <div className="container">
    <LocationSection />
        </div>
      </section>

    {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <ContactSection />
        </div>
      </section>

    {/* Footer */}
    <Footer />
      
      {/* Floating Action Button */}
      <div className="fab-container">
        <button className="fab glass-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
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


