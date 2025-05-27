import React, { useEffect, useRef } from 'react';
import './Hero.css';
import heroImage from './heroimage.png';

const Hero = () => {
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
    <section ref={sectionRef} className="hero fade-in-section">
      <div className="container">
        <div className="hero-content">
          <h1>Exclusive Deals of<br/>Furniture Collection</h1>
          <p>Explore different categories. Find the best deals.</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Furniture Collection" /> {/* Replace with your image path */}
        </div>
      </div>
    </section>
  );
};

export default Hero; 