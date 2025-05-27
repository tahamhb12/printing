import React, { useEffect, useRef } from 'react';
import './Benefits.css';

const Benefits = () => {
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
    <section ref={sectionRef} className="benefits-section fade-in-section">
      <div className="container">
        <h2>Benefits for your expediency</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">{/* Icon for Payment Method */}</div>
            <h3>Payment Method</h3>
            <p>We offer flexible payment options, to make easier.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">{/* Icon for Return policy */}</div>
            <h3>Return policy</h3>
            <p>You can return a product within 30 days.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">{/* Icon for Customer Support */}</div>
            <h3>Customer Support</h3>
            <p>Our customer support is 24/7.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits; 