import React, { useRef, useEffect, useState } from 'react';
import './AllProducts.css';
import { Link, useLocation } from 'react-router-dom';
import { UserAuth } from '../AuthContext/AuthContext';

const AllProducts = () => {
  const { products, currentPage, totalPages, handlePageChange, categories } = UserAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
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

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

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
        <div className="products-header">
          <h2>All Products</h2>
          <div className="products-stats">
            <span>{filteredProducts.length} products found</span>
            {selectedCategory !== 'all' && (
              <span className="category-badge">{selectedCategory}</span>
            )}
          </div>
        </div>

        <div className="products-controls">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
        
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
            <div className={`products ${viewMode}`}>
              {filteredProducts.map(product => (
                <Link 
                  to={`/product/${product.id}`}
                  key={product.id} 
                  className="product"
                >
                  <div className="img">
                    <img src={product.image_url} alt={product.name} />
                    {product.discount && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                  </div>
                  <div className="infos">
                    <h2>{product.name}</h2>
                    <p className="description">{product.description}</p>
                    <div className="product-meta">
                      <span className="price">${product.price}</span>
                      {product.rating && (
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <span>{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <button className="view-details">View Details</button>
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
          <>
            <div className="no-products">
              <i className="fas fa-box-open"></i>
              <h3>No Products Found</h3>
              <p>There are no products matching your search criteria.</p>
            </div>

            {/* Show pagination even when no results on current page */}
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
        )}
      </div>
    </div>
  );
};

export default AllProducts; 