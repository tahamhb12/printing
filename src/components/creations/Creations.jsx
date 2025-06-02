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
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Create two sets of cards for seamless infinite scroll
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const duplicatedCards = [...cards, ...cards];

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
              <button className="arrow-button">&rarr;</button>
            </div>
          </div>
          <div className="creations-grid">
            <div className="creations-grid-inner">
              {duplicatedCards.map((index, i) => (
                <div 
                  key={`${index}-${i}`}
                  className={`creation-card ${hoveredIndex !== null && hoveredIndex !== index ? 'blurred' : ''}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations;