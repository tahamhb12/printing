import React from 'react';
import './Footer.css';
import logo from '../navbar/logo.png'; // Assuming the logo is in the same location as the navbar logo
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="footer-links">
            <h3>Quick Link</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="#" onClick={scrollToTop}>About Us</Link></li>
              <li><Link to="/categories-products" onClick={scrollToTop}>Products</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </div>
          <div className="footer-description">
            <h3>About Us</h3>
            <p>We are a printing company dedicated to providing high-quality printing services for all your needs.</p>
            {/* Add more contact info or social media links here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 