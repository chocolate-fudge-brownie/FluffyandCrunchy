// Import modules
const express = require('express');

// Import gatekeeping middlewares
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// Import models
const {
  models: { Product },
} = require('../db');

// Create sub-router mounted on /api/products
const router = express.Router();

// GET /api/products
// GET all products
router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:productId
// Get single product
router.get('/:productId', async (req, res, next) => {
  try {
    let { productId } = req.params;
    let product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product Not Found');
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/products
// Add a product (admin only)
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:productId
// Update a product (admin only)
router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let newProduct = req.body;
    let { productId } = req.params;
    let product = await Product.findByPk(productId);
    if (product) {
      let updatedProduct = await product.update(newProduct);
      res.json(updatedProduct);
    } else {
      res.status(404).send('Product Not Found');
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:productId
// Delete a product (admin only)
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(202).send(product);
    } else {
      res.status(404).send('Product Not Found');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
