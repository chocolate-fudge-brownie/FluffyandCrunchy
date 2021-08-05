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
export const _clearStorage = () => ({
    type: CLEAR_STORAGE,
});

export const _addProductToCart = (cart) => ({
    type: ADD_PRODUCT_TO_CART,
    cart,
});

export const _removeProductFromCart = (cart) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    cart,
});

export const _getCartProducts = (cart) => ({
    type: GET_CART_PRODUCTS,
    cart,
});

/**
 * THUNK CREATORS
 */
// Implement an object for fast lookup (given id and quantity).

export const clearStorage = () => (dispatch) => {
    window.localStorage.removeItem('cart');
    dispatch(_clearStorage());
};

export const addProductToCart = (id, quantity) => (dispatch) => {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let stringId = String(id);

    if (!cart) {
        window.localStorage.setItem('cart', JSON.stringify({ [id]: quantity }));
    } else {
        if (Object.keys(cart).includes(stringId)) {
            cart[stringId] += quantity;
        } else {
            cart[stringId] = quantity;
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    dispatch(_addProductToCart(cart));
};

export const getCartProducts = () => (dispatch) => {
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    dispatch(_getCartProducts(cart));
};

export const removeProductFromCart = (id) => (dispatch) => {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart) {
        cart[id] = Math.max(cart[id] - 1, 0);

        if (cart[id] <= 0) {
            delete cart[id];
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(_removeProductFromCart(cart));
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
