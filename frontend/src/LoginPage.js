import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import "./App.css";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <nav className={`navbar glass-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <div className="logo-container">
            <svg className="navbar-logo" width="32" height="32" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="brand-text">Workbeat</span>
          </div>
        </a>
        
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="/#hero" className="navbar-link" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="/#features" className="navbar-link" onClick={closeMobileMenu}>Features</a></li>
          <li><a href="/#services" className="navbar-link" onClick={closeMobileMenu}>Services</a></li>
          <li><a href="/#pricing" className="navbar-link" onClick={closeMobileMenu}>Pricing</a></li>
          <li><a href="/#gallery" className="navbar-link" onClick={closeMobileMenu}>Spaces</a></li>
          <li><a href="/#contact" className="navbar-link" onClick={closeMobileMenu}>Contact</a></li>
        </ul>
        
        
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
  );
}




export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [signupMsg, setSignupMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Handler for checkbox toggle
  const handleToggle = (e) => {
    setIsLogin(e.target.checked);
    setSignupMsg("");
    setLoginMsg("");
  };

  return (
    <div className={`auth-app ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
      
      <Navbar />
      <main className="auth-container">
        <div className="auth-card">
          {/* Image in empty half: left for login, right for signup */}
          {!isLogin && (
            <div className="auth-image-half right">
              <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Login Art" />
            </div>
          )}
          {isLogin && (
            <div className="auth-image-half left">
              <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Login Art" />
            </div>
          )}
          <input type="checkbox" id="chk" aria-hidden="true" checked={isLogin} onChange={handleToggle} />
          {/* Signup Section */}
          <div className="signup-section">
            <form className="auth-form" onSubmit={async (e) => {
              e.preventDefault();
              setSignupMsg("");
              const email = e.target.email.value;
              const password = e.target.password.value;
              try {
                const res = await fetch('http://localhost:5000/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
                });
                if (res.ok) {
                  setSignupMsg('You are now registered');
                } else {
                  const data = await res.json();
                  setSignupMsg(data.error || 'Registration failed');
                }
              } catch (err) {
                setSignupMsg('Network error');
              }
            }}>
              <h2>Create Account</h2>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  className="auth-input"
                />
                <span className="input-icon">✉️</span>
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                  className="auth-input"
                />
                <span className="input-icon">🔒</span>
              </div>
              <button type="submit" className="auth-btn primary">
                Sign Up
              </button>
              {signupMsg && <div className={`auth-msg${signupMsg === 'You are now registered' ? ' auth-msg-success' : ' auth-msg-error'}`}>{signupMsg}</div>}
              <p className="toggle-prompt">
                Already have an account?{' '}
                <label htmlFor="chk" className="toggle-link">
                  Login here
                </label>
              </p>
            </form>
          </div>
          {/* Login Section */}
          <div className="login-section">
            <form className="auth-form" onSubmit={async (e) => {
              e.preventDefault();
              setLoginMsg("");
              const email = e.target.email.value;
              const password = e.target.password.value;
              try {
                const res = await fetch('http://localhost:5000/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
                });
                if (res.ok) {
                  const data = await res.json();
                  // Merge backend user info with any existing localStorage info for that user
                  const prevUser = JSON.parse(localStorage.getItem(`user_${data.id}`)) || {};
                  const mergedUser = { ...prevUser, ...data };
                  localStorage.setItem(`user_${data.id}`, JSON.stringify(mergedUser));
                  localStorage.setItem('currentUserId', data.id);
                  if (data.role === 'admin') {
                    navigate('/admin/dashboard');
                  } else {
                    navigate('/user/dashboard');
                  }
                } else {
                  setLoginMsg('Informations are false');
                }
              } catch (err) {
                setLoginMsg('Network error');
              }
            }}>
              <h2>Welcome Back</h2>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  className="auth-input"
                />
                <span className="input-icon">✉️</span>
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                  className="auth-input"
                />
                <span className="input-icon">🔒</span>
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="/forgot-password" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="auth-btn secondary">
                Login
              </button>
              {loginMsg && <div className={`auth-msg${loginMsg === 'Informations are false' || loginMsg === 'Network error' ? ' auth-msg-error' : ' auth-msg-success'}`}>{loginMsg}</div>}
              <p className="toggle-prompt">
                Don't have an account?{' '}
                <label htmlFor="chk" className="toggle-link">
                  Sign up here
                </label>
              </p>
            </form>
          </div>
        </div>
      </main>
      <div className="simple-login-footer">© 2025 Workbeat. All rights reserved.</div>
    </div>
  );
}