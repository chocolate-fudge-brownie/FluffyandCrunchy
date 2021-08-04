/**
 * ACTION TYPES
 */

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const GET_CART_PRODUCTS = 'GET_CARD_PRODUCTS';
const CLEAR_STORAGE = 'CLEAR_STORAGE';

/**
 * ACTION CREATORS
 */
export const _clearStorage = () => ({
    type: CLEAR_STORAGE,
});

export const _addProductToCart = (product) => ({
    type: ADD_PRODUCT_TO_CART,
    product,
});

export const _removeProductFromCart = (products) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    products,
});

export const _getCartProducts = (products) => ({
    type: GET_CART_PRODUCTS,
    products,
});

/**
 * THUNK CREATORS
 */
// Implement an object for fast lookup (given id and quantity).
export const addProductToCart = (product) => (dispatch) => {
    if (!window.localStorage.getItem('products')) {
        window.localStorage.setItem('products', JSON.stringify([]));
    }
    window.localStorage.setItem(
        'products',
        JSON.stringify([
            ...JSON.parse(window.localStorage.getItem('products')),
            product,
        ])
    );
    dispatch(_addProductToCart(product));
};

export const getCartProducts = () => (dispatch) => {
    if (!window.localStorage.getItem('products')) {
        window.localStorage.setItem('products', JSON.stringify([]));
    }
    dispatch(
        _getCartProducts(JSON.parse(window.localStorage.getItem('products')))
    );
};

export const removeProductFromCart = (id) => (dispatch) => {
    if (!window.localStorage.getItem('products')) {
        window.localStorage.setItem('products', JSON.stringify([]));
    }
    const products = JSON.parse(window.localStorage.getItem('products'));

    dispatch(
        _removeProductFromCart(products.filter((product) => product.id !== id))
    );
};

/**
 * REDUCER
 */

export default function (state = [], action) {
    switch (action.type) {
        case GET_CART_PRODUCTS:
            return action.products;
        case ADD_PRODUCT_TO_CART:
            return [...state, action.product];
        case REMOVE_PRODUCT_FROM_CART:
            return action.products;
        case CLEAR_STORAGE:
            return [];
        default:
            return state;
    }
}
