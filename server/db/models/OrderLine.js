const Sequelize = require('sequelize');
const db = require('../db');

// The OrderLine through table will not have an ID by default
/*
    Column   |           Type           | Collation | Nullable | Default 
    -----------+--------------------------+-----------+----------+---------
    createdAt | timestamp with time zone |           | not null | 
    updatedAt | timestamp with time zone |           | not null | 
    orderId   | integer                  |           | not null | 
    productId | integer                  |           | not null | 
*/

const OrderLine = db.define('OrderLine', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
});

module.exports = OrderLine;