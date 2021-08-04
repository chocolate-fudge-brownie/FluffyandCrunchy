//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// associations could go here!

Order.belongsTo(User, { foreignKey: 'customerId', as: 'Customer' }); 
User.hasMany(Order, {foreignKey: 'customerId'});

Order.belongsToMany(Product, { through: 'OrderLine' });
Product.belongsToMany(Order, { through: 'OrderLine' });

// through table - OrderLine - should have its own model and fields. => price, quantity.
// 'OrderLine' model will append properties to the join table.


// Checking Out

// guest - > can have guest access the checkout route, should have an effect on quantity of products, make an order..as if the user were logged in. user.id -> null
module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
}
