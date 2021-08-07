const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// Update order total price
Order.prototype.priceUpdate = async function () {
  let sum = 0;
  this.products.forEach((product) => {
    sum += product.OrderLine.price * product.OrderLine.quantity;
  });
  this.total = sum;
  await this.save();
  return this;
};

// Create paid order for visitor checkout
Order.prototype.visitorCheckout = async function (cart) {
  // get cart products based on local cart
  const cartProducts = await Promise.all(
    Object.keys(cart).map(async (productId) => {
      return await Product.findByPk(productId);
    })
  );

  // fulfill order with cart products
  await this.setProducts(cartProducts);

  // set paid products quantity & price
  await Promise.all(
    Object.keys(cart).map(async (productId) => {
      const product = await Product.findByPk(productId);
      await this.addProduct(product, {
        through: {
          quantity: cart[productId],
          price: product.price,
        },
      });
    })
  );

  // update paid order total price
  const newOrder = await Order.findByPk(this.id, {
    include: Product,
  });
  return await newOrder.priceUpdate();
};

module.exports = Order;
