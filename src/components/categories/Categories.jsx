import React, { useEffect, useRef } from 'react';
import './Categories.css';
import { UserAuth } from '../../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import img1 from './gadget.png';
import img2 from './pub.png';
import img3 from './pap.png';

const Categories = () => {
  const sectionRef = useRef(null);
  const {categories} = UserAuth();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

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

  const handleCategoryClick = (category) => {
    navigate('/products', { state: { selectedCategory: category } });
    scrollToTop()
  };

  const categoryImages = [img1, img2, img3];
  return (
    <section ref={sectionRef} className="categories-section fade-in-section">
      <div className="container">
        <h2>Explore by Category</h2>
        <div className="categories-content">
          <div className="category-grid">
            {categories.slice(0, 3).map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="card-image"><img src={categoryImages[index]} alt="" /></div>
                <div className="card-info">
                  <h3>{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories; 