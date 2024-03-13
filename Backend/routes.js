const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, createProduct, updateProduct, deleteProduct, getProductsByCategory, getAllProducts } = require('./controllers');

router.post('/categories', async (req, res) => {
  const { categoryName } = req.body;
  try {
    const result = await createCategory(categoryName);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { newName } = req.body;
  try {
    const result = await updateCategory(categoryId, newName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await deleteCategory(categoryId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/products', async (req, res) => {
  const { productName, categoryId } = req.body;
  try {
    const result = await createProduct(productName, categoryId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { newName } = req.body;
  try {
    const result = await updateProduct(productId, newName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await deleteProduct(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for getting products by category is kept as before

router.get('/products', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const products = await getAllProducts(page, pageSize);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
