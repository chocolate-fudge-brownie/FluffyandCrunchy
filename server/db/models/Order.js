const Sequelize = require('sequelize');
const db = require('../db');

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

Order.prototype.priceUpdate = async function () {
  let sum = 0;
  this.products.forEach((product) => {
    sum += product.OrderLine.price * product.OrderLine.quantity;
  });
  this.total = sum;
  await this.save();
  return this;
};

module.exports = Order;
