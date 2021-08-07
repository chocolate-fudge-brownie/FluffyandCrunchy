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

Order.prototype.updateCart = async function(product, options) {
    await this.addProducts(product, options);
    this.total += product.price;
    await this.save();
    return { order: this.dataValues, price: this.total }  
}

module.exports = Order;

