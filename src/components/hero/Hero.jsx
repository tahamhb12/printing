import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import image from './heroimage.png'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide0 from '../slider images/Slide 0.jpg';
import slide1 from '../slider images/Slide 1.jpg';
import slide2 from '../slider images/Slide 2.jpg';


const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    slide0,
    slide1,
    slide2,
  ];

  return (
    <div className="hero">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
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
          <i className="fa-solid fa-pencil"></i>
          <h3>Design graphique</h3>
          <p>Le webdesign est essentiel pour transmettre des messages marketing de manière claire, afin d'offrir une expérience utilisateur fluide et agréable.</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-print"></i>
          <h3>Impression grand format</h3>
          <p>Nous réalisons des impressions de grande taille sur divers supports pour créer des affiches, bannières et panneaux adaptés à vos besoins.</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-cube"></i>
          <h3>Impression Offset</h3>
          <p>Impression à plat avec des plaques servant à transférer des images sur papier ou matériaux spéciaux, idéale pour de grandes quantités.</p>
        </div>
        <div className="feature">
          <i class="fa-solid fa-bag-shopping"></i>
          <h3>Gadgets publicitaires</h3>
          <p>Nous proposons des objets personnalisés, cadeaux ou goodies pour promouvoir votre marque, de la sélection des articles à la livraison.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero; 