const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const Order = require('./Order');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,

  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

User.prototype.getCart = async function () {
  const orders = await this.getOrders();
  const customerId = orders[0].customerId;
  const cart = await Order.findOne({
    where: {
      id: customerId,
      isPaid: false
    }
  });
  return cart;
}
/**
 * classMethods
 */

User.authenticate = async function({ username, password }){
    const user = await this.findOne({ where: { username } })
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}
User.peekCart = async function(user) {
  // next step: addProductToOrder
  try {
    if(!user) throw new Error('failed to pass in a user as an argument');
    const { username } = user;
    const data = await User.findOne({
      where: { username },
      include: {
        model: Order,
        where: {
          isPaid: false
        }
    }});
    const cart = data.orders[0];
    cart.dataValues['products'] = await cart.getProducts();
    return cart.dataValues;    
  } catch (err) {
    console.log(err);
  }
}
/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
User.afterCreate(async (user) => {
  await user.createOrder();
})

/* after create hook for associating a new user with an unpaid order */


/* peekCart documentation - class method
  - Parameters: a user instance
  - Return Value: the order object whose isPaid value is set to False. We will refer to this as the cart. Recall, there is only one cart per user, but a user can have many orders.
  - NOTICE: Inside the cart object is a products array that contains all of the products associated with the cart.
  - Previously, I used my own priceUpdate() method on the Order Model to add a product to the cart.
  - example: 
      const user = await User.create({ username: 'Chukwudi', password: 'password', admin: false });

          const fluffs = await Product.create({ name: 'fluffs', price: 450 });
          const crunchies = await Product.create({ name: 'crunchies', price: 200 });

          await User.peekCart(user);
          const orders = await user.getOrders(); // this is how we access the cart.
          const cart = orders[0]; // recall that the cart is supposed to exist on index 0 of the return value in getOrders(). this is the cart that is automatically created after the user is created
          await cart.priceUpdate(fluffs);
          const newCart = await User.peekCart(user);
[#1]      console.log(newCart);
  - You can also destructure the products out of the return object from peekCart()
  - example: { products } = await User.peekCart(user)

  - Below you will find an example output from [#1]
  {
  id: 1,
  total: 450,
  isPaid: false,
  createdAt: 2021-08-05T20:24:52.767Z,
  updatedAt: 2021-08-05T20:24:52.791Z,
  customerId: 1,
  products: [
    product {
      dataValues: [Object],
      _previousDataValues: [Object],
      _changed: Set {},
      _options: [Object],
      isNewRecord: false,
      OrderLine: [OrderLine]
    }
  ]
}

*/

/* getCart documentation - instance method
  - Parameter: no parameters
  - Return Value: returns the cart object (an order object with isPaid equal to false)

*/