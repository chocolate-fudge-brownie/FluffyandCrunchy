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
