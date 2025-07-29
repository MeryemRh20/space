import React from "react";
import "./App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="logo-icon" aria-label="heartbeat-logo">
            <svg width="28" height="20" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
              <polyline points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" stroke="#21c87a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="logo-text">Workbeat</span>
        </div>
        <nav className="footer-nav">
          <a href="#gallery">Spaces</a>
          <a href="#location" onClick={e => {
            e.preventDefault();
            const el = document.getElementById('location');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Location</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-socials">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-icon">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.594 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-social-icon">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.388 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.005-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.514 14.009-14.009 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z"/></svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 10.27h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Workbeat. All rights reserved.</span>
        <span className="footer-made">Made with <span style={{color:'#21c87a'}}>♥</span> in Casablanca</span>
      </div>
    </footer>
  );
}
