import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post('http://localhost:3000/categories', {
        categoryName: newCategoryName
      });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (id, name) => {
    setEditingCategoryId(id);
    setEditedCategoryName(name);
  };

  const saveEditedCategory = async () => {
    try {
      await axios.put(`http://localhost:3000/categories/${editingCategoryId}`, {
        newName: editedCategoryName
      });
      setCategories(categories.map(category =>
        category.id === editingCategoryId ? { ...category, name: editedCategoryName } : category
      ));
      setEditingCategoryId(null);
      setEditedCategoryName('');
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Category Master</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter new category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="mr-2 px-2 py-1 border"
        />
        <button onClick={addCategory} className="bg-green-500 text-white px-2 py-1 rounded">Add Category</button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2 bg-gray-100 rounded p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{category.name}</p>
                <p className="text-gray-600">ID: {category.id}</p>
              </div>
              {editingCategoryId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="mr-2 px-2 py-1 border"
                  />
                  <button onClick={saveEditedCategory} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                </>
              ) : (
                <>
                  <div>
                    <button onClick={() => deleteCategory(category.id)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
                    <button onClick={() => handleEditCategory(category.id, category.name)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  </div>
                 
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMaster;
