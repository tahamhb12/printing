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
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return number;
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
            value={formatPhoneNumber(phoneNumber)}
            onChange={handlePhoneChange}
            placeholder="(123) 456-7890"
            className="phone-input"
          />
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn">
            Ajouter au Panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 