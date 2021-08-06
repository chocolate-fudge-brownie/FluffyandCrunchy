<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const {models: { Order, Product }} = require('../db');
const {requireToken, isAdmin} = require( './gatekeepingMiddleware')

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try{
    let orders = await Order.findAll();
    res.json(orders)
  } catch(error){
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id, {include: Product});
    if(order){
      res.json(order);
    } else {
      res.status(404).send("Order not found")
    }

  } catch (error) {
      next(error)
  }
})

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    let order = req.body;
    let nOrder = Order.create(order);
    res.status(201).json(nOrder);
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    let newOrder = req.body;
    let {id} = req.params;
    let  order = await Order.findByPk(id);
    if(order){
      let updatedOrder = await order.update(newOrder);
      res.json(updatedOrder);
    } else {

      res.status(404).send("Order Not Found")
      // throw new Error("order Not Found")
    }

  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try{
    const order = await Order.findByPk(req.params.id);
    if(order){
      await order.destroy();
     res.status(202).send(order);
    } else {
      res.status(404).send("Order not found")
    }
  } catch (error) {
    next(error)
  }

})
router.get('/:id/products', async (req,res, next) => {
  try{
    let {id} = req.params;
    let order = await Order.findByPk(id, {include: Product})
    let {products} = order;
    res.json(products)
  } catch (error){
    next(error)
  }
})
router.get('/:id/products/:productId', async (req, res, next) => {
  try{
      let {id, productId} = req.params;
      let order = await Order.findByPk(id, {include: Product});
      let {products} = order.dataValues;
      let filteredProduct = filterProductsById(products, productId);
      res.json(filteredProduct)

  } catch(error){
    next(error)
  }
})

const filterProductsById = (arr, id) => {
    id = parseInt(id);
    return arr.map(element => element.dataValues)
              .find(element => element.id === id)
}

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const {models: { Order }} = require('../db');
const {requireToken, isAdmin} = require( './gatekeepingMiddleware')

router.get('/', async (req, res, next) => {
  try{
    let orders = await Order.findAll();
    res.json(orders)
  } catch(error){
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id);
    if(order){
      res.json(order);
    } else {
      res.status(404).send("Order not found")
    }

  } catch (error) {
      next(error)
  }
})

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    let order = req.body;
    let nOrder = Order.create(order);
    res.status(201).json(nOrder);
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    let newOrder = req.body;
    let {id} = req.params;
    let  order = await Order.findByPk(id);
    if(order){
      let updatedOrder = await order.update(newOrder);
      res.json(updatedOrder);
    } else {

      res.status(404).send("Order Not Found")
      // throw new Error("order Not Found")
    }

  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try{
    const order = await Order.findByPk(req.params.id);
    if(order){
      await order.destroy();
     res.status(202).send(order);
    } else {
      res.status(404).send("Order not found")
    }
  } catch (error) {
    next(error)
  }

})
module.exports = router;
>>>>>>> main
