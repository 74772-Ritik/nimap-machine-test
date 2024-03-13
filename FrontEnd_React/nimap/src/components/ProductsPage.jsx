import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`http://localhost:3000/products`, { productName: newProductName, categoryId: selectedCategoryId });
      fetchProducts();
      setNewProductName('');
      setSelectedCategoryId('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (productId, updatedProductName) => {
    try {
      await axios.put(`http://localhost:3000/products/${productId}`, { name: updatedProductName });
      fetchProducts();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Products for Category {categoryId}</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className="border border-gray-400 rounded-lg px-3 py-2 mr-2"
        />
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="border border-gray-400 rounded-lg px-3 py-2 mr-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add Product
        </button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="bg-gray-100 rounded-lg p-4 mb-2">
            <div>
              <strong>Product Name:</strong> 
              {product.editing ? (
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProducts(products.map((p) => (p.id === product.id ? { ...p, name: e.target.value } : p)))}
                  onBlur={() => handleEditProduct(product.id, product.name)}
                  className="border border-gray-400 rounded-lg px-3 py-2 mr-2"
                />
              ) : (
                <span>{product.name}</span>
              )}
            </div>
            <div>
              <strong>Product ID:</strong> {product.id}
            </div>
            <div>
              <strong>Category ID:</strong> {product.Category ? product.Category.id : ''}
            </div>
            <div>
              <strong>Category Name:</strong> {product.Category ? product.Category.name : ''}
            </div>
            <div>
              {product.editing ? (
                <button
                  onClick={() => handleEditProduct(product.id, product.name)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setProducts(products.map((p) => (p.id === product.id ? { ...p, editing: true } : p)))}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
