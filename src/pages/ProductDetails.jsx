import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../AuthContext/AuthContext';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { products } = UserAuth();
  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Initialize selected variants with first option of each variant
      if (foundProduct.variants) {
        const initialVariants = {};
        foundProduct.variants.forEach(variant => {
          if (variant.options && variant.options.length > 0) {
            initialVariants[variant.variant] = variant.options[0];
          }
        });
        setSelectedVariants(initialVariants);
      }
    }
  }, [id, products]);

  const handleVariantChange = (variantName, option) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option
    }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) { // Limit to 10 digits
      setPhoneNumber(value);
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    return number.replace(/\D/g, ''); // Just return the numbers
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid phone number');
      return;
    }

    const url = 'https://script.google.com/macros/s/AKfycbxkfWAL1r7d_Z7dqrhYqd66AKY6F0lv-1fuM1VK1wGSFg9GK8_kntjRiBKMt8xQbI0NQA/exec';

    const formData = {
      name: product.name,
      description: product.description,
      variants: Object.entries(selectedVariants).map(([key, value]) => `${key}: ${value}`).join(', '),
      quantite: quantity.toString(),
      telephone: formatPhoneNumber(phoneNumber),
      date: new Date().toISOString().split('T')[0] // Use current date
    };

    const body = Object.keys(formData)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
      .join('&');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      });
      
      const data = await response.text();
      alert('Votre commande a été enregistrée avec succès! Nous vous contacterons bientôt.');
      
      // Reset form
      setQuantity(1);
      setPhoneNumber('');
      if (product.variants) {
        const initialVariants = {};
        product.variants.forEach(variant => {
          if (variant.options && variant.options.length > 0) {
            initialVariants[variant.variant] = variant.options[0];
          }
        });
        setSelectedVariants(initialVariants);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Désolé, une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <div className="main-image">
          <img src={product.image_url} alt={product.name} />
        </div>
      </div>

      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        
        <div className="product-category">
          <span>Catégorie:</span> {product.category}
        </div>

       {/*  <div className="product-price">
          <span className="price">${product.price}</span>
        </div> */}

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="product-variants">
            <h3>Options Disponibles</h3>
            {product.variants.map((variant, index) => (
              <div key={index} className="variant-group">
                <label className="variant-label">{variant.variant}:</label>
                <div className="variant-options">
                  {variant.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`variant-option ${selectedVariants[variant.variant] === option ? 'selected' : ''}`}
                      onClick={() => handleVariantChange(variant.variant, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="product-quantity">
          <label htmlFor="quantity">Quantité:</label>
          <div className="quantity-controls">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="quantity-btn"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button 
              onClick={() => setQuantity(prev => prev + 1)}
              className="quantity-btn"
            >
              +
            </button>
          </div>
        </div>

        <div className="phone-input-group">
          <label htmlFor="phone">Numéro de Téléphone:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="0123456789"
            className="phone-input"
            required
          />
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn" onClick={handleSubmit}>
            Commander
          </button>
          <p className="confirmation-note">Nous vous appellerons pour confirmer votre commande.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 