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
          <p className="section-subtitle">Statistiques</p>
          <h2>Notre Imprimerie en<br/>Chiffres</h2>
          <p>Transformez vos idées en réalité avec nos solutions d'impression de haute qualité. Rapide, fiable et parfait à chaque fois.</p>
          <button className="learn-more-btn">En savoir plus</button>
        </div>
        <div className="statistics-numbers">
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Statistics; 