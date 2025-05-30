import React, { useEffect, useRef, useState } from 'react';
import './Creations.css';

const Creations = () => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optionally, unobserve once visible if it only needs to animate once
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section ref={sectionRef} className="creations-section fade-in-section">
      <div className="container">
        <div className="creations-content">
          <div className="featured-card">
            <h2>Nos<br/>Collabs</h2>
            <p className="subtitle">Conçu dans notre<br/>studio</p>
            <div className="more-link">
              <span>Glisser</span>
              <div className="progress-bar"></div>
              <button className="arrow-button">&rarr;</button> {/* Or an actual arrow icon */}
            </div>
          </div>
          <div className="creations-grid">
            {[1, 2, 3, 4,5,6,7,8,9,10].map((index) => (
              <div 
                key={index}
                className={`creation-card ${hoveredIndex !== null && hoveredIndex !== index ? 'blurred' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations; 