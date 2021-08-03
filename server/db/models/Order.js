const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    total: {
        type: Sequelize.DECIMAL(13, 2),
        validate: {
            min: 0.00,
        },
        defaultValue: 0.00
    }
})

Order.prototype.update = function(product) {
    
}
Order.prototype.updateTotal = function(product) {
    this.total = parseFloat(this.total);
    this.total += parseFloat(product.price);
    return this.total;
}

module.exports = Order;