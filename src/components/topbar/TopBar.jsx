import React, { useState } from 'react';
import './TopBar.css';

const TopBar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <div 
            className={`contact-item ${activeItem === 'phone' ? 'active' : ''}`}
            onClick={() => handleItemClick('phone')}
          >
            <i className="fas fa-phone"></i>
            <span className="contact-detail">+1 (555) 123-4567</span>
          </div>
          <div 
            className={`contact-item ${activeItem === 'email' ? 'active' : ''}`}
            onClick={() => handleItemClick('email')}
          >
            <i className="fas fa-envelope"></i>
            <span className="contact-detail">info@yourcompany.com</span>
          </div>
          <div 
            className={`contact-item ${activeItem === 'location' ? 'active' : ''}`}
            onClick={() => handleItemClick('location')}
          >
            <i className="fas fa-map-marker-alt"></i>
            <span className="contact-detail">123 Business Street, City, Country</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 