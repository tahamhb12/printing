import React, { useEffect, useRef } from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
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

  // Placeholder steps data
  const steps = [
    {
      id: 1,
      title: "Place Your Order",
      description: "Easily select your desired products and customize your order online."
    },
    {
      id: 2,
      title: "Design Confirmation",
      description: "Our team will review your design and send a confirmation for your approval."
    },
    {
      id: 3,
      title: "Printing Process",
      description: "Using high-quality materials and technology, we print your order with precision."
    },
    {
      id: 4,
      title: "Quality Check & Ship",
      description: "We perform a final quality check before carefully packaging and shipping your order."
    }
  ];

  return (
    <section ref={sectionRef} className="how-it-works-section fade-in-section">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map(step => (
            <div key={step.id} className="step-item">
              <div className="step-icon">{/* Icon for step */}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 