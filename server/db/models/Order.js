const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    total:  {
        type: Sequelize.DECIMAL(13, 2),
        validate: {
            min: 0.00,
        }
    }
})

module.exports = Order;