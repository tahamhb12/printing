import React, { useEffect, useRef } from 'react';
import './Categories.css';
import { UserAuth } from '../../AuthContext/AuthContext';

const Categories = () => {
  const sectionRef = useRef(null);
  const {categories} = UserAuth()

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
    <section ref={sectionRef} className="categories-section fade-in-section">
      <div className="container">
        <h2>Explore by Category</h2>
        <div className="categories-content">
          <div className="category-filter">
            <div className="search-input">
              <input type="text" placeholder="Search" />
              {/* Add search icon here */}
            </div>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li key={index} className="category-item">
                  {category}
                </li>
              ))}
            </ul>
            <button className="all-categories-btn">All Categories &rarr;</button>
          </div>
          <div className="category-grid">
            {/* Placeholder category cards */}
            <div className="category-card">
                <div className="card-image">{/* Category Image */}</div>
                <div className="card-info">
                    <h3>Bedroom</h3>
                    <p>Explore</p>
                </div>
            </div>
            <div className="category-card"></div>
            <div className="category-card"></div>
            <div className="category-card"></div>
            <div className="category-card"></div>
            <div className="category-card"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories; 