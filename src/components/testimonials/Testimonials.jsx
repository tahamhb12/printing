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
      quote: "Tres bon service.",
      author: "Wadie Wadie",
      date: "2025-05-08",
      rating: 5,
      source: "Google",
      avatar: "R"
    },
    {
      id: 2,
      quote: "A7ssen service o khdma wa3ra ❤️",
      author: "Anas Khouya",
      date: "2025-05-03",
      rating: 5,
      source: "Google",
      avatar: "A"
    },
    {
      id: 3,
      quote: "Très belle expérience. Rapidité et prise en charge irréprochables. Je salue le professionnalisme et...",
      author: "Hassar Mona",
      date: "2025-04-30",
      rating: 5,
      source: "Google",
      avatar: "H"
    },
    {
      id: 4,
      quote: "Très bon service",
      author: "Hamza Ouhayou",
      date: "2025-04-28",
      rating: 5,
      source: "Google",
      avatar: "H"
    }
  ];

  return (
    <section ref={sectionRef} className="testimonials-section fade-in-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map(testimonial => (
            <div key={testimonial.id} className="testimonial-item">
              <div className="testimonial-meta">
                <div className="user-info">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="name-date">
                    <p className="author">{testimonial.author}</p>
                    <p className="date">{testimonial.date}</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-rating">
                 {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="quote">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 