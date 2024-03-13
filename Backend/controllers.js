const { Category, Product } = require('./models');

async function createCategory(categoryName) {
  try {
    const category = await Category.create({ name: categoryName });
    return { categoryId: category.id };
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Error creating category');
  }
}

async function updateCategory(categoryId, newName) {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    category.name = newName;
    await category.save();
    return { categoryId: category.id, newName: category.name };
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Error updating category');
  }
}

async function deleteCategory(categoryId) {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.destroy();
    return { message: 'Category deleted successfully' };
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Error deleting category');
  }
}

async function getAllCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw new Error('Error fetching all categories');
  }
}

async function getAllProducts(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  try {
    const products = await Product.findAll({
      include: Category,
      limit: parseInt(pageSize),
      offset: parseInt(offset)
    });
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Error fetching all products');
  }
}

async function createProduct(productName, categoryId) {
  try {
    const product = await Product.create({ name: productName, CategoryId: categoryId });
    return { productId: product.id };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
}

async function updateProduct(productId, newName) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    product.name = newName;
    await product.save();
    return { productId: product.id, newName: product.name };
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
}

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategories, getAllProducts, createProduct, updateProduct, deleteProduct };
