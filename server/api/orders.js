const router = require('express').Router();
const {
  models: { User, Order, Product, OrderLine },
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
// Get cart order of single user (user only)
router.get('/cart/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.userId)) {
      const user = await User.findByPk(req.params.userId);
      if (user) {
        const cartOrder = await user.getCart();
        res.json(cartOrder);
      } else {
        res.status(404).send('User Not Found');
      }
    } else {
      res.status(403).send('Not Authorized');
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
