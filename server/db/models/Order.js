const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    total: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
        },
        defaultValue: 0
    },
    isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})
// cart -> Order w/ isPaid false.
// user is created, unpaid order is created ?
// sequelize hooks..
// provide an afterCreate hook for new users.. empty cart/order
// a guest should have a persistent cart on client side

Order.prototype.update = async function(product) {
    await this.addProducts(product);
    this.total += product.price;
    await this.save();
    return this.total;   
}

module.exports = Order;
