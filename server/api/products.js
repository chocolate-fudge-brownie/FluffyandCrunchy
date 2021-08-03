const express = require("express");
const router = express.Router();
const {models: { Product} }= require('../db')

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
})

router.get(':/id', async (req, res, next) => {
  try {
      let productId = req.params.id;
      let product = await Product.findByPk(productId);
      res.status(200).json(product);
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
      let newProduct = req.body;
      let {id} = req.params;
      let  product = await Product.findByPk(id);
      let updateProduct = await product.update(newProduct);
      res.status(200).json(updatedProduct);
  } catch(error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
      const product = await Product.findByPk(req.params.id);
      await product.destory();
      res.send(product);
  } catch(error) {
    next(error);
  }
})


module.exports = router;
