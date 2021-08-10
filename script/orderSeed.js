// Creating Paid Orders For Users
// NOTE: if maxProductsLength is greater than products.length we will get an infinite loop as we will never reach the case where the set.size(),
// which is AT MOST equal to products.length, is equal maxProductsLength which is necessary for the loop to break
// We use a set to avoid duplicate inputs, yet to be honest, we could've used an array since we are checking for uniqueness before appending anyways
class orderSeed {
  constructor(users, products) {
    this.users = users;
    this.products = products;
  }
  // helper method for seedOrdersToUsers, generates a random local cart based on the parameter val  => maxProductsLength
  generateLocalCart(maxProductsLength) {
    const set = new Set();
    const localCart = {};
    if (maxProductsLength > this.products.length) {
      return new Error(
        `input size for generateLocalCart must be less than or equal to the amount of products seeded. Amount of products seeded => ${products.length}`
      );
    }
    while (set.size < maxProductsLength) {
      const randomId = Math.ceil(Math.random() * this.products.length);
      if (!set.has(randomId)) {
        set.add(randomId);
        localCart[randomId] = Math.ceil(Math.random() * 10);
      }
    }
    return localCart;
  }

  // helper method for seedOrdersToUsers, uses .updateCart() and .checkoutCart() in one.
  async handleLocalCart(user, localCart) {
    try {
      await user.updateCart(localCart);
      await user.checkoutCart();
    } catch (err) {
      console.log(err);
    }
  }

  // creates n orders of length m on every user, creates 5 random orders with 3 products on each order for every user by default.
  async seedOrdersToUsers(numOfOrders = 5, amountOfProducts = 3) {
    await Promise.all(
      this.users.map(async (user) => {
        for (let i = 0; i < numOfOrders; i++) {
          const localCart = this.generateLocalCart(amountOfProducts);
          await this.handleLocalCart(user, localCart);
        }
      })
    );
  }

  // adds n products in cart for every user, Creates a localCart with 3 products for every user by default
  async seedProductsInCartForUsers(amountOfProducts = 3) {
    await Promise.all(
      this.users.map(async (user) => {
        const cart = await user.getCart();
        if(cart) return cart;
        const localCart = this.generateLocalCart(amountOfProducts);
        await user.updateCart(localCart);
      })
    );
  }
}

module.exports = orderSeed;
