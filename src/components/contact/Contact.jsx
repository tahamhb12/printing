import React, { useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
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
    <section ref={sectionRef} className="contact-section fade-in-section">
      <div className="container">
        <h2>Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>Have a question or want to work together? Fill out the form or contact us using the details below:</p>
            <ul>
              <li><strong>Email:</strong> info@example.com</li>
              <li><strong>Phone:</strong> +1 123 456 7890</li>
              <li><strong>Address:</strong> 123 Main Street, Anytown, USA</li>
            </ul>
            {/* Add social media links here */}
          </div>
          <div className="contact-form">
            <form>{/* Add form fields here */}
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 