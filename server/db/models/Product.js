const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // Change Decimal to integer.
    price: {
        type: Sequelize.DECIMAL(13, 2),
        validate: {
            min: 0.00,
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: 'No description provided for this product.',
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://freepngimg.com/thumb/teddy_bear/11-2-teddy-bear-free-download-png.png'
    }
});

module.exports = Product;

// Sequelize.DECIMAL(13,2) supports a maximum value of -> $99,999,999,999.99