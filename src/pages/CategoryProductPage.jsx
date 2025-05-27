import React, { useState, useEffect } from 'react';
import './CategoryProductPage.css';

const productsPerPage = 9; // Number of products to display per page

const CategoryProductPage = () => {
  // In a real application, you would fetch data here
  const categories = [
    { id: 1, name: 'Bedroom' },
    { id: 2, name: 'Dinning Room' },
    { id: 3, name: 'Meeting Room' },
    { id: 4, name: 'Workspace' },
    { id: 5, name: 'Living Room' },
    { id: 6, name: 'Kitchen' },
    { id: 7, name: 'Living Space' },
  ];

  const allProducts = [
    // Placeholder product data (add more for pagination testing)
    { id: 1, name: 'Product 1', categoryId: 1, imageUrl: 'placeholder.jpg' },
    { id: 2, name: 'Product 2', categoryId: 1, imageUrl: 'placeholder.jpg' },
    { id: 3, name: 'Product 3', categoryId: 2, imageUrl: 'placeholder.jpg' },
    { id: 4, name: 'Product 4', categoryId: 3, imageUrl: 'placeholder.jpg' },
    { id: 5, name: 'Product 5', categoryId: 4, imageUrl: 'placeholder.jpg' },
    { id: 6, name: 'Product 6', categoryId: 5, imageUrl: 'placeholder.jpg' },
    { id: 7, name: 'Product 7', categoryId: 6, imageUrl: 'placeholder.jpg' },
    { id: 8, name: 'Product 8', categoryId: 7, imageUrl: 'placeholder.jpg' },
    { id: 9, name: 'Product 9', categoryId: 1, imageUrl: 'placeholder.jpg' },
    { id: 10, name: 'Product 10', categoryId: 2, imageUrl: 'placeholder.jpg' },
    { id: 11, name: 'Product 11', categoryId: 3, imageUrl: 'placeholder.jpg' },
    { id: 12, name: 'Product 12', categoryId: 4, imageUrl: 'placeholder.jpg' },
    { id: 13, name: 'Product 13', categoryId: 5, imageUrl: 'placeholder.jpg' },
    { id: 14, name: 'Product 14', categoryId: 6, imageUrl: 'placeholder.jpg' },
    { id: 15, name: 'Product 15', categoryId: 7, imageUrl: 'placeholder.jpg' },
    // Add more product data to test pagination
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Filter products based on selected category
    const filtered = selectedCategory
      ? allProducts.filter(product => product.categoryId === selectedCategory)
      : allProducts;
    
    // Display initial set of products
    setVisibleProducts(filtered.slice(0, productsPerPage));
    setHasMore(filtered.length > productsPerPage);
  }, [selectedCategory]); // Re-run when selectedCategory changes

  const handleLoadMore = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = allProducts
      .filter(product => selectedCategory === null || product.categoryId === selectedCategory)
      .slice(currentLength, currentLength + productsPerPage);

    setVisibleProducts(prevProducts => [...prevProducts, ...nextProducts]);

    if (visibleProducts.length + nextProducts.length >= (selectedCategory
        ? allProducts.filter(product => product.categoryId === selectedCategory).length
        : allProducts.length)) {
      setHasMore(false);
    }
  };

  return (
    <div className="category-product-page">
      <div className="container">
        <h2>All Categories and Products</h2>
        <div className="page-content">
          <div className="category-list-sidebar">
            <h3>Categories</h3>
            <ul>
              <li
                className={selectedCategory === null ? 'active' : ''}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </li>
              {categories.map(category => (
                <li
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="product-grid">
            <h3>Products {selectedCategory ? `in ${categories.find(cat => cat.id === selectedCategory)?.name}` : ''}</h3>
            <div className="grid-container">
              {visibleProducts.map(product => (
                <div key={product.id} className="product-item">
                  <img src={product.imageUrl} alt={product.name} />
                  <h4>{product.name}</h4>
                  {/* Add more product details */}
                </div>
              ))}
            </div>
            {hasMore && (
              <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage; 