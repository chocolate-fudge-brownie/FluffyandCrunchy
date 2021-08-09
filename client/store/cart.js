import axios from 'axios';

/**
 * ACTION TYPES
 */

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS';
const CLEAR_STORAGE = 'CLEAR_STORAGE';

/**
 * ACTION CREATORS
 */

export const _getCartProducts = (cart) => ({
  type: GET_CART_PRODUCTS,
  cart,
});

export const _addProductToCart = (cart) => ({
  type: ADD_PRODUCT_TO_CART,
  cart,
});

export const _removeProductFromCart = (cart) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  cart,
});

export const _clearStorage = () => ({
  type: CLEAR_STORAGE,
});

/**
 * THUNK CREATORS
 */

// Implement cart as an object for fast lookup: {[productId]: quantity}

// Get cart from local storage
export const getCartProducts = () => async (dispatch) => {
  try {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    if (!cart) cart = {};
    window.localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(_getCartProducts(cart));
  } catch (err) {
    console.log(err);
  }
};

// Get cart & merge with local cart when user log in
export const mergeCart = (userId, loggedInBefore) => async (dispatch) => {
  try {
    let mergedCart = {};

    // get local cart in format of {[productId]: quantity}
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    if (!cart) cart = {};

    // get cart from database if user is logged in
    const token = window.localStorage.getItem('token');
    if (token) {
      const { data: dbCart } = await axios.get(`/api/orders/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });

      // dbCart is an order object {orderid, total, products:[{product}...]}
      // so we have to transfer it to {[productId]: quantity}
      dbCart.products.forEach((product) => {
        mergedCart[product.id] = product.OrderLine.quantity;
      });

      // merge cart only if user has not logged in before
      if (!loggedInBefore) {
        for (let id in cart) {
          if (mergedCart[id]) mergedCart[id] += cart[id];
          else mergedCart[id] = cart[id];
        }
      }

      // save merged cart in both local & database
      window.localStorage.setItem('cart', JSON.stringify(mergedCart));
      await axios.put(`/api/orders/cart/${userId}`, mergedCart, {
        headers: {
          authorization: token,
        },
      });
    } else {
      // set local cart as merged cart if user is not logged in
      mergedCart = cart;
    }

    dispatch(_getCartProducts(mergedCart));
  } catch (err) {
    console.log(err);
  }
};

// Add product to local cart & Update database cart accordingly
export const addProductToCart = (productId, userId) => async (dispatch) => {
  try {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    if (!cart) {
      window.localStorage.setItem('cart', JSON.stringify({ [productId]: 1 }));
    } else {
      let stringId = String(productId);
      if (Object.keys(cart).includes(stringId)) {
        cart[stringId] += 1;
      } else {
        cart[stringId] = 1;
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    // update database cart if user is logged in
    const token = window.localStorage.getItem('token');
    if (token) {
      await axios.put(`/api/orders/cart/${userId}`, cart, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(_addProductToCart(cart));
  } catch (err) {
    console.log(err);
  }
};

// Remove product from local cart & Update dabase cart accordingly
export const removeProductFromCart =
  (productId, userId) => async (dispatch) => {
    try {
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      if (cart && cart[productId]) {
        cart[productId] = Math.max(cart[productId] - 1, 0);

        if (cart[productId] <= 0) {
          delete cart[productId];
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));

        // update database cart if user is logged in
        const token = window.localStorage.getItem('token');
        if (token) {
          await axios.put(`/api/orders/cart/${userId}`, cart, {
            headers: {
              authorization: token,
            },
          });
        }

        dispatch(_removeProductFromCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };

// Clear local cart
export const clearStorage = () => async (dispatch) => {
  try {
    window.localStorage.setItem('cart', JSON.stringify({}));
    dispatch(_clearStorage());
  } catch (err) {
    console.log(err);
  }
};

export const checkOut = (userId) => async (dispatch) => {
  try {
    // do nothing if cart is empty
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if (Object.keys(cart).length === 0) return;

    // user checkout
    const token = window.localStorage.getItem('token');
    if (token) {
      await axios.put(`/api/orders/checkout/${userId}`, null, {
        headers: {
          authorization: token,
        },
      });

      // visitor checkout
    } else {
      await axios.post(`/api/orders/checkout`, cart);
    }

    // clear local cart
    dispatch(clearStorage());
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return action.cart;
    case ADD_PRODUCT_TO_CART:
      return action.cart;
    case REMOVE_PRODUCT_FROM_CART:
      return action.cart;
    case CLEAR_STORAGE:
      return {};
    default:
      return state;
  }
}
