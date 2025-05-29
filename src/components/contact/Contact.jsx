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
              <li><strong>Email:</strong> Imp.Merryconcept@gmail.com </li>
              <li><strong>Phone:</strong> +212-661945584</li>
              <li><strong>Address:</strong> Imm B6 Mag 18 El Bassama 2 Marjan Meknès - 50070</li>
            </ul>
            {/* Add social media links here */}
          </div>
          <div className="contact-map">
            {/* Replace the src with your actual Google Maps embed URL */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13252.10702096669!2d-5.57825180203853!3d33.86320134331489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b8bcbfe178f%3A0x429a605b6d43b9b2!2sImp%20merry%20concept!5e0!3m2!1sfr!2sma!4v1748461871938!5m2!1sfr!2sma"
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
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