import React from 'react';
import Contact from '../components/contact/Contact';
import './ContactPage.css'; // Optional: for page-specific styles

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* You can add a page title or other elements here if needed */}
      <Contact />
    </div>
  );
};

export default ContactPage; 