const Sequelize = require('sequelize');
const db = require('../db');

const OrderLine = db.define('OrderLine', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    }
});

module.exports = OrderLine;