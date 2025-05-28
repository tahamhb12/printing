import React, { useRef, useEffect, useState } from 'react';
import './AllProducts.css';
import { Link, useLocation } from 'react-router-dom';
import { UserAuth } from '../AuthContext/AuthContext';

const AllProducts = () => {
  const { products, currentPage, totalPages, handlePageChange, categories } = UserAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a category in the navigation state
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Generate page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div ref={sectionRef} className="all-products fade-in-section">
      <div className="container">
        <h2>All Products</h2>
        
        {/* Category Filter */}
        <div className="category-filter">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="products">
              {filteredProducts.map(product => (
                <Link 
                  to={`/product/${product.id}`}
                  key={product.id} 
                  className="product"
                >
                  <div className="img">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="infos">
                    <h2 style={{textAlign:"left"}}>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-nav"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Previous
                </button>
                
                {renderPageNumbers()}
                
                <button
                  className="page-nav"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <h3>No Products Found</h3>
            <p>There are no products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts; 