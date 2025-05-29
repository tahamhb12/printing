import React from 'react';
import './Footer.css';
import logo from '../navbar/logo.png'; // Assuming the logo is in the same location as the navbar logo
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  const scrollToTop = () => {
    navigate('/')
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div onClick={scrollToTop} className="footer-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="footer-links">
            <h3>Liens Rapides</h3>
            <ul>
              <li><Link to="/" onClick={scrollToTop}>Accueil</Link></li>
              <li><Link to="#" onClick={scrollToTop}>À Propos</Link></li>
              <li><Link to="/products" onClick={scrollToTop}>Produits</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </div>
          <div className="footer-description">
            <h3>À Propos</h3>
            <p>Nous sommes une entreprise d'impression dédiée à fournir des services d'impression de haute qualité pour tous vos besoins.</p>
            {/* Add more contact info or social media links here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 