const router = require('express').Router();
const {
  models: { Order, Product },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// GET /api/orders
// Get all orders of all users (admin only)
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    let orders = await Order.findAll({
      include: Product,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/user/:userId
// Get all orders of single user (user & admin only)
router.get('/user/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.userId) || req.user.admin) {
      let orders = await Order.findAll({
        include: Product,
        where: {
          customerId: req.params.userId,
        },
      });
      res.json(orders);
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderId
// Get single order by order id (user & admin only)
router.get('/:orderId', requireToken, async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.orderId, {
      include: Product,
    });
    if (req.user.id === order.customerId || req.user.admin) {
      if (order) res.json(order);
      else res.status(404).send('Order not found');
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/cart/:userId
// Get cart of single user (user only)
router.get('/cart/:userId', requireToken, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.id === Number(req.params.userId)) {
      const cart = await user.getCart();
      res.json(cart);
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/orders/cart/:userId
// Update cart order of single user (user only)
router.put('/cart/:userId', requireToken, async (req, res, next) => {
  try {
    const { user } = req;
    const cart = req.body; // {[productId]: quantity}
    if (user.id === Number(req.params.userId)) {
      let updatedCart = await user.updateCart(cart);
      res.json(updatedCart);
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/cart/:userId
// Clear cart order of single user (user only)
router.delete('/cart/:userId', requireToken, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.id === Number(req.params.userId)) {
      let updatedCart = await user.updateCart({});
      res.json(updatedCart);
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/orders/checkout
// Add new order for visitor checkout (all visitors)
router.post('/checkout', async (req, res, next) => {
  try {
    // create new paid order with cart products
    const cart = req.body;
    let newOrder = await Order.create({ isPaid: true });
    newOrder = await newOrder.visitorCheckout(cart);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// PUT /api/orders/checkout/:userId
// Update cart order for user checkout (user only)
router.put('/checkout/:userId', requireToken, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.id === Number(req.params.userId)) {
      await user.checkoutCart();
      res.json();
    } else {
      res.status(403).send('Not Authorized');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
