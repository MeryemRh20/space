import React from 'react';

const LocationSection = () => (
  <section className="location-section" id="location">
    <h2 style={{color: "#fc651f"}}>Visit Us</h2>
    <div className="location-content">
      <div className="location-info">
        <p>
          📍 <b>123 Avenue du Progrès, Casablanca</b><br/>
          Open 24/7<br/>
          Contact: hello@workbeat.com
        </p>
        <a href="#plans" className="btn primary">Book a Tour</a>
      </div>
      <div className="location-map">
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.357474908934!2d-7.626074684800597!3d33.57311098073215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2b5b6b6b6b6%3A0x7b7b7b7b7b7b7b7b!2sCasablanca!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma"
          loading="lazy"
        ></iframe>
        <div className="map-overlay">
          <p>📍 <b>Our Location</b><br/>Easy to find in central Casablanca</p>
        </div>
      </div>
    </div>
  </section>
);

export default LocationSection;