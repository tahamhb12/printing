import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import image from './heroimage.png'

const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Professional Printing Services</h1>
          <p>Transform your ideas into reality with our high-quality printing solutions. Fast, reliable, and perfect every time.</p>
          <div className="hero-buttons">
            <Link to="/products" onClick={scrollToTop} className="primary-btn">
              <i className="fas fa-print"></i>
              <span>View Products</span>
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="secondary-btn">
              <i className="fas fa-envelope"></i>
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={image} alt="Printing Services" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="hero-features">
        <div className="feature">
          <i className="fas fa-truck"></i>
          <h3>Fast Delivery</h3>
          <p>Quick turnaround time</p>
        </div>
        <div className="feature">
          <i className="fas fa-medal"></i>
          <h3>Premium Quality</h3>
          <p>Best materials used</p>
        </div>
        <div className="feature">
          <i className="fas fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Always here to help</p>
        </div>
      </div>
    </div>
  );
};

export default Hero; 