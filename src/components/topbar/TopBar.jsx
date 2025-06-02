import React, { useState } from 'react';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate()

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };
  const scrollToTop = () => {
    navigate('/contact')
    window.scrollTo(0, 0);
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
            <span className="contact-detail" onClick={scrollToTop}>+212-661945584</span>
          </div>
          <div 
            className={`contact-item ${activeItem === 'email' ? 'active' : ''}`}
            onClick={() => handleItemClick('email')}
          >
            <i className="fas fa-envelope"></i>
            <span className="contact-detail" onClick={scrollToTop}>Imp.Merryconcept@gmail.com</span>
          </div>
          <div 
            className={`contact-item ${activeItem === 'location' ? 'active' : ''}`}
            onClick={() => handleItemClick('location')}
          >
            <i className="fas fa-map-marker-alt"></i>
            <span className="contact-detail" onClick={scrollToTop}>"Imm B6 Mag 18 El Bas..."</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/+212661945584" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 