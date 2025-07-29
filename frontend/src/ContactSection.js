import React, { useState } from "react";
import "./App.css";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title" style={{fontSize: "3rem", fontWeight: 900, color: '#fc651f', marginBottom: "0.2rem", textAlign: "center", letterSpacing: 1}}>
        Contact Us
      </h2>
      <div style={{height: 4, width: 100, background: "var(--main-mint)", borderRadius: 3, margin: "0.7rem auto 2.3rem auto"}}></div>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows={5}
            required
          />
          <button type="submit" className="btn primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <div className="contact-success">Thank you! We'll get back to you soon.</div>
          )}
        </form>
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            <b>Email:</b> hello@workbeat.com<br />
            <b>Phone:</b> +212 6 12 34 56 78<br />
            <b>Address:</b> 123 Avenue du Progrès, Casablanca
          </p>
          <div className="contact-socials">
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.594 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.388 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.005-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.514 14.009-14.009 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 10.27h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
