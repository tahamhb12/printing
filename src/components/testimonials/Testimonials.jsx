import React, { useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
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

  // Placeholder testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "John Doe",
      title: "Happy Customer"
    },
    {
      id: 2,
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Jane Smith",
      title: "Satisfied Client"
    },
    {
      id: 3,
      quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Peter Jones",
      title: "Great Experience"
    }
  ];

  return (
    <section ref={sectionRef} className="testimonials-section fade-in-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-item">
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">- {testimonial.author}</p>
              <p className="title">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 