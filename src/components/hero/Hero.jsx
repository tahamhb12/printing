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
          <h1>Services d'Impression Professionnels</h1>
          <p>Transformez vos idées en réalité avec nos solutions d'impression de haute qualité. Rapide, fiable et parfait à chaque fois.</p>
          <div className="hero-buttons">
            <Link to="/products" onClick={scrollToTop} className="primary-btn">
              <i className="fas fa-print"></i>
              <span>Voir les Produits</span>
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="secondary-btn">
              <i className="fas fa-envelope"></i>
              <span>Contactez-nous</span>
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
          <h3>Livraison Rapide</h3>
          <p>Délai d'exécution rapide</p>
        </div>
        <div className="feature">
          <i className="fas fa-medal"></i>
          <h3>Qualité Premium</h3>
          <p>Meilleurs matériaux utilisés</p>
        </div>
        <div className="feature">
          <i className="fas fa-headset"></i>
          <h3>Support 24/7</h3>
          <p>Toujours là pour vous aider</p>
        </div>
      </div>
    </div>
  );
};

export default Hero; 