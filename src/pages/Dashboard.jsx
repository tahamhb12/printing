import React, { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css';
import supabase from '../helpler/supabaseClient';
import { UserAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';

// Move EditModal outside of Dashboard component
const EditModal = ({ isOpen, onClose, editFormData, handleEditChange, handleUpdateProduct, handleEditPhotoChange, editPreviewUrl, categories, handleEditVariantChange, handleEditVariantOptionChange, addEditVariantOption, removeEditVariantOption, addEditVariant, removeEditVariant }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Product</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleUpdateProduct} className="product-form">
          <div className="form-group">
            <label htmlFor="edit-photo">Update Product Photo</label>
            <div className="photo-preview">
              {editPreviewUrl ? (
                <img src={editPreviewUrl} alt="Product preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
              ) : editFormData.image_url ? (
                <img src={editFormData.image_url} alt="Current product" style={{width: '128px', height: '196px', objectFit: 'cover'}} />
              ) : (
                <div className="photo-placeholder">
                  <span>No image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="edit-photo"
              name="photo"
              onChange={handleEditPhotoChange}
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-name">Product Name</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              placeholder="Enter product description"
              rows="4"
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="edit-price">Price ($)</label>
            <input
              type="number"
              id="edit-price"
              name="price"
              value={editFormData.price}
              onChange={handleEditChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
              name="category"
              value={editFormData.category}
              onChange={handleEditChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Variants</label>
            {editFormData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="variant-group">
                <div className="variant-header">
                  <input
                    type="text"
                    value={variant.variant}
                    onChange={(e) => handleEditVariantChange(variantIndex, 'variant', e.target.value)}
                    placeholder="Variant name (e.g., Color, Size)"
                  />
                  <button
                    type="button"
                    className="remove-variant"
                    onClick={() => removeEditVariant(variantIndex)}
                  >
                    Remove Variant
                  </button>
                </div>
                
                <div className="options-list">
                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-item">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleEditVariantOptionChange(variantIndex, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button
                        type="button"
                        className="remove-option"
                        onClick={() => removeEditVariantOption(variantIndex, optionIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-option"
                    onClick={() => addEditVariantOption(variantIndex)}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add-variant"
              onClick={addEditVariant}
            >
              Add Variant
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Update Product
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { products, currentPage, totalPages, handlePageChange, categories, setproducts } = UserAuth();
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'edit'
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    /* price: '', */
    category: '',
    variants: [
      { variant: 'Color', options: [] },
      { variant: 'Size', options: [] }
    ]
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    /* price: '', */
    category: '',
    image_url: '',
    variants: [
      { variant: 'Color', options: [] },
      { variant: 'Size', options: [] }
    ]
  });
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);


  
  // File states
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const sectionRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to extract filename from Supabase public URL
  const extractFilenameFromUrl = (url) => {
    if (!url) return null;
    try {
      // Extract the filename from the Supabase storage URL
      // URL format: https://xxx.supabase.co/storage/v1/object/public/product-images/filename
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1]; // Get the last part (filename)
    } catch (error) {
      console.error('Error extracting filename from URL:', error);
      return null;
    }
  };

  // Function to delete image from Supabase storage
  const deleteImage = async (imageUrl) => {
    try {
      const filename = extractFilenameFromUrl(imageUrl);
      if (!filename) {
        console.warn('Could not extract filename from URL:', imageUrl);
        return false;
      }

      const { error } = await supabase.storage
        .from('product-images')
        .remove([filename]);

      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }

      console.log('Successfully deleted image:', filename);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };

  // Function to upload image to Supabase storage
  const uploadImage = async (file, fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload image
      const imageUrl = await uploadImage(selectedFile, fileName);
      
      if (!imageUrl) {
        alert('Error uploading image');
        setUploading(false);
        return;
      }

      // Insert product with image URL
      const productWithImage = {
        ...productData,
        image_url: imageUrl
      };

      const { data, error } = await supabase
        .from('products')
        .insert([productWithImage])
        .select()
        .single();

      if (error) {
        console.log(error);
        alert('Error adding product');
      } else {
        // Reset form
        setProductData({
          name: '',
          description: '',
          /* price: '', */
          category: '',
          variants: [
            { variant: 'Color', options: [] },
            { variant: 'Size', options: [] }
          ]
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name || '',
      description: product.description || '',
      /* price: product.price || '', */
      category: product.category || '',
      image_url: product.image_url || '',
      variants: product.variants || [
        { variant: 'Color', options: [] },
        { variant: 'Size', options: [] }
      ]
    });
    setEditPreviewUrl(product.image_url);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let updateData = {
        name: editFormData.name,
        /* price: editFormData.price, */
        description: editFormData.description,
        category: editFormData.category,
        variants: editFormData.variants
      };

      // If new image is selected, upload it and delete the old one
      if (editSelectedFile) {
        const fileExt = editSelectedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const imageUrl = await uploadImage(editSelectedFile, fileName);
        
        if (!imageUrl) {
          alert('Error uploading image');
          setUploading(false);
          return;
        }
        
        updateData.image_url = imageUrl;

        // Delete the old image after successful upload
        if (selectedProduct.image_url) {
          await deleteImage(selectedProduct.image_url);
        }
      }

      const { data, error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", selectedProduct.id)
        .select()
        .single();

      if (error) {
        console.log(error.message);
        alert('Error updating product');
      } else {
        // Fetch the updated products list with pagination
        const { data: updatedProducts, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .range((currentPage - 1) * 8, currentPage * 8 - 1)
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching updated products:', fetchError);
        } else {
          // Update the products in context
          setproducts(updatedProducts);
        }

        // Reset form
        setEditFormData({
          name: '',
          description: '',
          /* price: '', */
          category: '',
          image_url: '',
          variants: [
            { variant: 'Color', options: [] },
            { variant: 'Size', options: [] }
          ]
        });
        setShowEditModal(false);
        setEditSelectedFile(null);
        setEditPreviewUrl(null);
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Find the product to get its image URL
      const productToDelete = products.find(product => product.id === productId);
      
      // Delete the product from database
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.log(error);
        alert('Error deleting product');
      } else {
        // Delete the associated image from storage
        if (productToDelete && productToDelete.image_url) {
          await deleteImage(productToDelete.image_url);
        }

        // Fetch the updated products list with pagination
        const { data: updatedProducts, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .range((currentPage - 1) * 8, currentPage * 8 - 1)
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching updated products:', fetchError);
        } else {
          // Update the products in context
          setproducts(updatedProducts);
        }

        // Reset form
        setEditFormData({
          name: '',
          description: '',
          /* price: '', */
          category: '',
          image_url: '',
          variants: [
            { variant: 'Color', options: [] },
            { variant: 'Size', options: [] }
          ]
        });
        setShowEditModal(false);
        setEditSelectedFile(null);
        setEditPreviewUrl(null);
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
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
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const renderAddProduct = () => (
    <div className="dashboard-content">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-main">
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <div className="photo-preview">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Product preview" 
                    style={{width: '176px', height: '234px', objectFit: 'cover', border: '1px solid #ddd'}} 
                  />
                ) : (
                  <div className="photo-placeholder" style={{width: '150px', height: '150px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span>No image selected</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                id='image' 
                accept='image/*' 
                required 
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              {/* <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Variants</label>
              {productData.variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="variant-group">
                  <div className="variant-header">
                    <input
                      type="text"
                      value={variant.variant}
                      onChange={(e) => handleVariantChange(variantIndex, 'variant', e.target.value)}
                      placeholder="Variant name (e.g., Color, Size)"
                    />
                    <button
                      type="button"
                      className="remove-variant"
                      onClick={() => removeVariant(variantIndex)}
                    >
                      Remove Variant
                    </button>
                  </div>
                  
                  <div className="options-list">
                    {variant.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-item">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleVariantOptionChange(variantIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <button
                          type="button"
                          className="remove-option"
                          onClick={() => removeVariantOption(variantIndex, optionIndex)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-option"
                      onClick={() => addVariantOption(variantIndex)}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-variant"
                onClick={addVariant}
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={uploading}>
            {uploading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderProductList = () => (
    <div className="dashboard-content">
      <div className="products-list">
        <table className="products-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              {/* <th>Price</th> */}
              <th>Variants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-thumbnail">
                    <img 
                      src={product.image_url || '/placeholder-image.jpg'} 
                      alt={product.name}
                      style={{width: '60px', height: '60px', objectFit: 'cover'}}
                    />
                  </div>
                </td>
                <td>{product.name || 'N/A'}</td>
                <td>{product.description || 'N/A'}</td>
                <td>{product.category || 'N/A'}</td>
                {/* <td>${product.price || '0.00'}</td> */}
                <td>
                  {product.variants && product.variants.length > 0 ? (
                    <div className="variants-list">
                      {product.variants.map((variant, index) => (
                        <div key={index} className="variant-item">
                          <strong>{variant.variant}:</strong>
                          <span>{variant.options.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    'No variants'
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );

  // Add these new handlers
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...productData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setProductData({ ...productData, variants: newVariants });
  };

  const handleVariantOptionChange = (variantIndex, optionIndex, value) => {
    const newVariants = [...productData.variants];
    newVariants[variantIndex].options[optionIndex] = value;
    setProductData({ ...productData, variants: newVariants });
  };

  const addVariantOption = (variantIndex) => {
    const newVariants = [...productData.variants];
    newVariants[variantIndex].options.push('');
    setProductData({ ...productData, variants: newVariants });
  };

  const removeVariantOption = (variantIndex, optionIndex) => {
    const newVariants = [...productData.variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setProductData({ ...productData, variants: newVariants });
  };

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { variant: '', options: [] }]
    });
  };

  const removeVariant = (index) => {
    const newVariants = [...productData.variants];
    newVariants.splice(index, 1);
    setProductData({ ...productData, variants: newVariants });
  };

  // Add similar handlers for edit form
  const handleEditVariantChange = (index, field, value) => {
    const newVariants = [...editFormData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setEditFormData({ ...editFormData, variants: newVariants });
  };

  const handleEditVariantOptionChange = (variantIndex, optionIndex, value) => {
    const newVariants = [...editFormData.variants];
    newVariants[variantIndex].options[optionIndex] = value;
    setEditFormData({ ...editFormData, variants: newVariants });
  };

  const addEditVariantOption = (variantIndex) => {
    const newVariants = [...editFormData.variants];
    newVariants[variantIndex].options.push('');
    setEditFormData({ ...editFormData, variants: newVariants });
  };

  const removeEditVariantOption = (variantIndex, optionIndex) => {
    const newVariants = [...editFormData.variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setEditFormData({ ...editFormData, variants: newVariants });
  };

  const addEditVariant = () => {
    setEditFormData({
      ...editFormData,
      variants: [...editFormData.variants, { variant: '', options: [] }]
    });
  };

  const removeEditVariant = (index) => {
    const newVariants = [...editFormData.variants];
    newVariants.splice(index, 1);
    setEditFormData({ ...editFormData, variants: newVariants });
  };

  return (
    <div ref={sectionRef} className="dashboard-container">
      <div className="dashboard-header">
        <h1>Product Dashboard</h1>
        <p className="dashboard-subtitle">Manage your products</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Product
        </button>
        <button
          className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Products
        </button>
      </div>

      {activeTab === 'add' && renderAddProduct()}
      {activeTab === 'edit' && renderProductList()}
      
      <EditModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        editFormData={editFormData}
        handleEditChange={handleEditChange}
        handleUpdateProduct={handleUpdateProduct}
        handleEditPhotoChange={handleEditPhotoChange}
        editPreviewUrl={editPreviewUrl}
        categories={categories}
        handleEditVariantChange={handleEditVariantChange}
        handleEditVariantOptionChange={handleEditVariantOptionChange}
        addEditVariantOption={addEditVariantOption}
        removeEditVariantOption={removeEditVariantOption}
        addEditVariant={addEditVariant}
        removeEditVariant={removeEditVariant}
      />
    </div>
  );
};

export default Dashboard;