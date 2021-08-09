const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('./Product');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getCart = async function () {
  const [cart] = await this.getOrders({
    where: {
      isPaid: false,
    },
    include: Product,
  });
  return cart;
};

User.prototype.updateCart = async function (localCart) {
  const cart = await this.getCart();

  // get cart products based on local cart
  const cartProducts = await Promise.all(
    Object.keys(localCart).map(async (productId) => {
      return await Product.findByPk(productId);
    })
  );

  // reset cart products, so that products that no longer exist in local cart
  // will also be deleted from database cart
  await cart.setProducts(cartProducts);

  // set cart products quantity & price
  let updatedCart = await this.getCart();
  await Promise.all(
    Object.keys(localCart).map(async (productId) => {
      const product = await Product.findByPk(productId);
      await updatedCart.addProduct(product, {
        through: {
          quantity: localCart[productId],
          price: product.price,
        },
      });
    })
  );

  // update cart order total price
  updatedCart = await this.getCart();
  return await updatedCart.priceUpdate();
};

User.prototype.checkoutCart = async function () {
  const cart = await this.getCart();

  // change cart order to paid order
  if (cart.total > 0) {
    cart.isPaid = true;
    await cart.save();

    // create another empty unpaid order as the new cart for the user
    await this.createOrder();
  }
};

/**
 * classMethods
 */

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.peekCart = async function (user) {
  try {
    if (!user) throw new Error('failed to pass in a user as an argument');
    const cart = await user.getCart();
    cart.dataValues['products'] = await cart.getProducts();
    return cart.dataValues;
  } catch (err) {
    console.log(err);
  }
};

/**
 * hooks
 */

const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
User.afterCreate(async (user) => {
  await user.createOrder();
});

/* after create hook for associating a new user with an unpaid order */

/* peekCart documentation - class method
  - Parameters: a user instance
  - Return Value: the order object whose isPaid value is set to False. We will refer to this as the cart. Recall, there is only one cart per user, but a user can have many orders.
  - NOTICE: Inside the cart object is a products array that contains all of the products associated with the cart.
  - Previously, I used my own priceUpdate() method on the Order Model to add a product to the cart.
  - example:
          // creating a user creates an empty cart with 0 total and isPaid equal to false
          const user = await User.create({ username: 'Chukwudi', password: 'password', admin: false });
          const fluffs = await Product.create({ name: 'fluffs', price: 450 });
          const crunchies = await Product.create({ name: 'crunchies', price: 200 });
          let cart = await user.getCart();
          await cart.updateCart(fluffs);
          await cart.updateCart(crunchies);
          cart = await User.peekCart(user);
[#1]      console.log(cart);
  - You can also destructure the products out of the return object from peekCart()
  - example: { products } = await User.peekCart(user)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* getCart documentation - instance method - reserved for instance and class methods at the moment - can use in front-end if needed
  - Parameter: no parameters
  - Return Value: returns the cart object (an order object with isPaid equal to false)
  - Implementation: The user instance has access to getOrders(). We will use this magic methods to get all of the orders tied to the user.
  - Since all of the orders have the same customer.. we can use orders[0].customerId to get the customerId of the first order. This customer ID will allow us to look up
  - the user in the next line.
  - This next line uses customerId and attempts to find the order which is related to the user (customerId) and has an isPaid value of false.. this is the cart.
  - example:
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
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 - Sample Output
 order {
  dataValues: {
    id: 1,
    total: 0,
    isPaid: false,
    createdAt: 2021-08-05T21:38:13.968Z,
    updatedAt: 2021-08-05T21:38:13.968Z,
    customerId: 1
  },
  _previousDataValues: {
    id: 1,
    total: 0,
    isPaid: false,
    createdAt: 2021-08-05T21:38:13.968Z,
    updatedAt: 2021-08-05T21:38:13.968Z,
    customerId: 1
  },
  _changed: Set {},
  _options: {
    isNewRecord: false,
    _schema: null,
    _schemaDelimiter: '',
    raw: true,
    attributes: [ 'id', 'total', 'isPaid', 'createdAt', 'updatedAt', 'customerId' ]
  },
  isNewRecord: false
}

 - Note the fact that user.getCart() is essentially the same as user.getOrders() magic method
 - The only difference is now we are returning a singular cart and not an array of orders.
 - Note, getCart() is still returning an order. This means we can call the updateCart() instance method to update the total.
 - Take a look at the updateCart instance method on the Order model. This method returns the order object and the new price.
*/
