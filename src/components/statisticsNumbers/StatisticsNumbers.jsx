import React from 'react';
import './StatisticsNumbers.css';

const StatisticsNumbers = () => {
  return (
    <section className="statistics-numbers-section">
      <div className="container">
        <div className="statistics-numbers-grid">
          <div className="statistic-item">
            <h3>22+</h3>
            <p>Ans d'Expérience</p>
          </div>
          <div className="statistic-item">
            <h3>142+</h3>
            <p>Projets Réalisés</p>
          </div>
          <div className="statistic-item">
            <h3>362+</h3>
            <p>Équipe Professionnelle</p>
          </div>
          <div className="statistic-item">
            <h3>99 %</h3>
            <p>Clients Satisfaits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsNumbers; 