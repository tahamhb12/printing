import React, { useEffect, useRef } from 'react';
import './Statistics.css';
import img from './img.png'

const Statistics = () => {
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
    <section ref={sectionRef} className="statistics-section fade-in-section">
      <div className="container">
        <div className="statistics-content">
          <p className="section-subtitle">Statistic</p>
          <h2>Printshop in<br/>Number</h2>
          <p>Odio at elit mauris neque nisl odio elementum viverra sollicitudin. Ante sed aliquam et duis eu mauris. Tristique quisque amet turpis sed interdum non sollicitudin vulputate mi. Interdum in et ut sed semper ornare fames.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="statistics-numbers">
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Statistics; 