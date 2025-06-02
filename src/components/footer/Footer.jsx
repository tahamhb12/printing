import React from 'react';
import './Footer.css';
import logo from './logo.png'; // Assuming the logo is in the same location as the navbar logo
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
              <li><Link to="/products" onClick={scrollToTop}>Produits</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
              <li><Link to="#" onClick={scrollToTop}>À Propos</Link></li>
            </ul>
          </div>
          <div className="footer-description">
            <h3>À Propos</h3>
            <p>Nous sommes une entreprise d'impression dédiée à fournir des services d'impression de haute qualité pour tous vos besoins.</p>
            {/* Add more contact info or social media links here if needed */}
          </div>
          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13252.10702096669!2d-5.57825180203853!3d33.86320134331489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b8bcbfe178f%3A0x429a605b6d43b9b2!2sImp%20merry%20concept!5e0!3m2!1sfr!2sma!4v1748461871938!5m2!1sfr!2sma"
              width="300" 
              height="225" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 