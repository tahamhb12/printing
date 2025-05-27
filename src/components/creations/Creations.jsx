import React, { useEffect, useRef } from 'react';
import './Creations.css';

const Creations = () => {
  const sectionRef = useRef(null);

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

  return (
    <section ref={sectionRef} className="creations-section fade-in-section">
      <div className="container">
        <div className="creations-content">
          <div className="featured-card">
            <h2>Our Own<br/>Creation</h2>
            <p className="subtitle">Designed in our<br/>studio</p>
            <div className="more-link">
              <span>More</span>
              <div className="progress-bar"></div>
              <button className="arrow-button">&rarr;</button> {/* Or an actual arrow icon */}
            </div>
          </div>
          <div className="creations-grid">
            {/* Placeholder creation cards */}
            <div className="creation-card">
                <button className="explore-button">Explore All Rooms</button>
            </div>
            <div className="creation-card"></div>
            <div className="creation-card"></div>
            <div className="creation-card"></div>
            <div className="creation-card"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations; 