const express = require('express');
const router = express.Router();
const {
  models: { Order, Product, OrderLine },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// serve all orders of that user
router.get('/', async (req, res, next) => {
  try {
    let orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// serve single order of that order id
router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    next(error);
  }
});

// Get cart of that user id
router.get('/:userId/cart', async (req, res, next) => {
  try {
    // Get cart id
    const [cartOrder] = await Order.findAll({
      where: {
        customerId: req.params.userId,
        isPaid: false,
      },
    });

    if (cartOrder) {
      // Get cart details in orderline by cart id
      const cartProducts = await OrderLine.findAll({
        where: {
          orderId: cartOrder.id,
        },
      });

      // Map product id & quantity to cart { [productId]: quantity }
      const cart = {};
      cartProducts.forEach((product) => {
        cart[product.productId] = product.quantity;
      });

      // Send cart to client
      res.json(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (error) {
    next(error);
  }
});

// Update cart of that user id
router.put('/:userId/cart', async (req, res, next) => {
  try {
    // Get cart id
    const [cartOrder] = await Order.findAll({
      where: {
        customerId: req.params.userId,
        isPaid: false,
      },
    });

    if (cartOrder) {
      // Add products to cart {1: 2, 2: 1}
      const localCart = req.body; // { [productId]: quantity }
      await Promise.all(
        Object.keys(localCart).map(async (productId) => {
          const product = await Product.findByPk(productId);
          await cartOrder.addProduct(product, {
            through: {
              quantity: localCart[productId],
              price: product.price,
            },
          });
        })
      );

      // Send cart to client
      res.json();
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    let order = req.body;
    let nOrder = Order.create(order);
    res.status(201).json(nOrder);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    let newOrder = req.body;
    let { id } = req.params;
    let order = await Order.findByPk(id);
    if (order) {
      let updatedOrder = await order.update(newOrder);
      res.json(updatedOrder);
    } else {
      res.status(404).send('Order Not Found');
      // throw new Error("order Not Found")
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(202).send(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
