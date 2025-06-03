import React, { useRef, useEffect, useState } from 'react';
import './AllProducts.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../AuthContext/AuthContext';

const AllProducts = () => {
  const { products, currentPage, totalPages, handlePageChange, categories, isLoading, error } = UserAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const sectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset filters when component mounts or unmounts
  useEffect(() => {
    // Reset function
    const resetFilters = () => {
      setSelectedCategory('all');
      setSearchQuery('');
      setSortBy('name');
      setViewMode('grid');
      handlePageChange(1, 'all', '', 'name');
    };

    // Only reset if we're not coming from a category selection
    if (!location.state?.selectedCategory) {
      resetFilters();
    }

    // Cleanup function to reset filters when component unmounts
    return () => {
      resetFilters();
    };
  }, [location.pathname]);

  useEffect(() => {
    // Check if there's a category in the navigation state
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      handlePageChange(1, location.state.selectedCategory, '', sortBy);
      // Clear the navigation state after using it
      navigate(location.pathname, { replace: true });
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

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Keep the current search query when changing category
    handlePageChange(1, category, searchQuery, sortBy);
  };

  // Handle search change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear any existing timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    // Set a new timeout
    window.searchTimeout = setTimeout(() => {
      // Keep the current category when searching
      handlePageChange(1, selectedCategory, value, sortBy);
    }, 300); // 300ms delay
  };

  // Handle search clear
  const handleSearchClear = () => {
    setSearchQuery('');
    // Keep the current category when clearing search
    handlePageChange(1, selectedCategory, '', sortBy);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    // Keep both search and category when changing sort
    handlePageChange(1, selectedCategory, searchQuery, value);
  };

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
          onClick={() => handlePageChange(i, selectedCategory, searchQuery, sortBy)}
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
          <h2>Tous les Produits</h2>
          <div className="products-stats">
            <span>{products.length} produits trouvés</span>
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
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery ? (
              <button 
                className="clear-search"
                onClick={handleSearchClear}
                aria-label="Effacer la recherche"
              >
                <i className="fas fa-times"></i>
              </button>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="name">Trier par Nom</option>
              <option value="price-low">Prix : du plus bas au plus haut</option>
              <option value="price-high">Prix : du plus haut au plus bas</option>
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
            onClick={() => handleCategoryChange('all')}
          >
            Tous les Produits
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
            <button onClick={() => handlePageChange(1, selectedCategory, searchQuery, sortBy)}>
              Réessayer
            </button>
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className={`products ${viewMode}`}>
              {products.map((product) => (
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
                      {/* <span className="price">${product.price}</span> */}
                      {product.rating && (
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <span>{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <button className="view-details">Voir les Détails</button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-nav"
                  onClick={() => handlePageChange(currentPage - 1, selectedCategory, searchQuery, sortBy)}
                  disabled={currentPage === 1}
                >
                  &laquo; Précédent
                </button>
                
                {renderPageNumbers()}
                
                <button
                  className="page-nav"
                  onClick={() => handlePageChange(currentPage + 1, selectedCategory, searchQuery, sortBy)}
                  disabled={currentPage === totalPages}
                >
                  Suivant &raquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <h3>Aucun Produit Trouvé</h3>
            <p>Aucun produit ne correspond à vos critères de recherche.</p>
            {searchQuery && (
              <button 
                className="clear-filters"
                onClick={() => {
                  setSearchQuery('');
                  handlePageChange(1, selectedCategory, '', sortBy);
                }}
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts; 