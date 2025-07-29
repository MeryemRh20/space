import React from "react";
import "./App.css";

const services = [
  {
    title: "Open Space",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    desc: "Flexible desks in a vibrant, collaborative environment. High-speed internet, unlimited coffee & tea.",
    link: "#open-space"
  },
  {
    title: "Cafeteria",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    desc: "Cozy cafeteria with fresh drinks and snacks, perfect for breaks and informal meetings.",
    link: "#cafeteria"
  },
  {
    title: "Private Office",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    desc: "Fully furnished private offices for teams and individuals seeking privacy and comfort.",
    link: "#private-office"
  },
  {
    title: "Knowledge & Training",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "Workshops, training sessions, and events for continuous learning and growth.",
    link: "#training"
  },
  {
    title: "Conference Room",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    desc: "Modern meeting rooms with the latest technology and flexible layouts.",
    link: "#conference-room"
  },
  {
    title: "Networking Events",
    img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
    desc: "Connect, collaborate, and expand your network at our regular events.",
    link: "#events"
  },
 
];

export default function GallerySection() {
  return (
    <section id="gallery" className="section gallery-section">
      <h2 className="section-title" style={{fontSize: "3rem", fontWeight: 900, color: "#fc651f", marginBottom: "0.2rem", textAlign: "center", letterSpacing: 1}}>
        Workbeat Services & Spaces
      </h2>
      <div style={{height: 4, width: 120, background: "var(--main-mint)", borderRadius: 3, margin: "0.7rem auto 2.3rem auto"}}></div>
      <div className="card-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card premium-card">
            <div className="service-img-wrap">
              <img
                src={s.img}
                alt={s.title}
                className="service-img"
                style={{width: "100%", height: 160, objectFit: "cover", borderTopLeftRadius: "var(--main-radius)", borderTopRightRadius: "var(--main-radius)", transition: "transform 0.5s cubic-bezier(.4,2,.6,1)", boxShadow: "0 2px 16px #2b3a6722"}}
              />
              <div className="service-img-overlay"></div>
            </div>
            <div className="service-card-content">
              <h3 className="card-title" style={{fontWeight: 800, fontSize: "1.19rem", color: "var(--main-blue)", margin: 0}}>{s.title}</h3>
              <div className="service-desc-expand" style={{transition: "max-height 0.65s cubic-bezier(.4,2,.6,1), opacity 0.42s cubic-bezier(.4,2,.6,1)", maxHeight: 200, opacity: 1, overflow: "hidden", color: "#5a6473", fontSize: "1.04rem", marginTop: "0.7rem"}}>{s.desc}</div>
              <a href={s.link} className="card-btn" style={{marginTop: "1.2rem", display: "inline-block"}}>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
