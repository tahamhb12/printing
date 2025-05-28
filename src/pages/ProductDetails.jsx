import React, { useState } from 'react';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Dummy product data
  const product = {
    name: "Premium Wireless Headphones",
    brand: "SoundMaster Pro",
    price: 299.99,
    discount: 20,
    rating: 4.8,
    reviews: 1245,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    ],
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Bluetooth 5.0",
      "Premium Memory Foam Earpads",
      "Built-in Microphone",
      "Touch Controls"
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    relatedProducts: [
      {
        id: 1,
        name: "Wireless Earbuds",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300"
      },
      {
        id: 2,
        name: "Bluetooth Speaker",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300"
      },
      {
        id: 3,
        name: "Noise Cancelling Earbuds",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300"
      }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      comment: "Best headphones I've ever owned! The sound quality is incredible.",
      date: "2024-03-15"
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      comment: "Great battery life and comfortable for long sessions.",
      date: "2024-03-10"
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      comment: "The noise cancellation is a game-changer for my daily commute.",
      date: "2024-03-05"
    }
  ];

  return (
    <div className="product-details-container">
{/*       <div className="product-gallery">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
        <div className="thumbnail-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="brand">by {product.brand}</p>
        
        <div className="price-section">
          <span className="current-price">${product.price}</span>
          {product.discount && (
            <span className="original-price">
              ${(product.price * (1 + product.discount / 100)).toFixed(2)}
            </span>
          )}
          {product.discount && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>

        <div className="rating-section">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="rating-number">{product.rating}</span>
          <span className="reviews-count">({product.reviews} reviews)</span>
        </div>

        <div className="availability">
          <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="color-options">
          <h3>Color Options:</h3>
          <div className="color-buttons">
            {product.colors.map((color, index) => (
              <button key={index} className="color-button">
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="features">
          <h3>Key Features:</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="description">
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>

        <button className="add-to-cart">Add to Cart</button>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.user}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-products-grid">
          {product.relatedProducts.map(item => (
            <div key={item.id} className="related-product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      </div> */}
      <h2>later</h2>
    </div>
  );
};

export default ProductDetails; 