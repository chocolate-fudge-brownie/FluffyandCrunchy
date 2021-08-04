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
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
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