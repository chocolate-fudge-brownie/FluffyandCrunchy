//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderLine = require('./models/OrderLine');

// associations could go here!

Order.belongsTo(User, { foreignKey: 'customerId', as: 'Customer' }); 
User.hasMany(Order, { foreignKey: 'customerId' });

Order.belongsToMany(Product, { through: OrderLine });
Product.belongsToMany(Order, { through: OrderLine });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderLine
  },
}
