import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

/**
 * ACTION CREATORS
 */

const _getProducts = (products) => ({ type: GET_PRODUCTS, products });
const _deleteProduct = (product) => ({ type: DELETE_PRODUCT, product });
const _updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });
const _createProduct = (product) => ({ type: CREATE_PRODUCT, product });

/**
 * THUNK CREATORS
 */

export const createProduct = (product, history) => async (dispatch) => {
    try {
        const { data } = await axios.post('/api/products', product);
        dispatch(_createProduct(data));
        history.push('/products');
    } catch (err) {
        console.error(err);
    }
};

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/products');
        dispatch(_getProducts(data));
    } catch (err) {
        console.error(err);
    }
};

export const deleteProduct = (id, history) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/products/${id}`);
        dispatch(_deleteProduct(data));
        history.push('/products');
    } catch (err) {
        console.error(err);
    }
};

export const updateProduct = (id, product, history) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/products/${id}`, product);
        dispatch(_updateProduct(data));
        history.push('/products');
    } catch (err) {
        console.error(err);
    }
};

/**
 * REDUCER
 */

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return [...state, action.product];
        case GET_PRODUCTS:
            return action.products;
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.product.id);
        case UPDATE_PRODUCT:
            return state.map((product) =>
                product.id === action.product.id ? action.product : product
            );
        default:
            return state;
    }
}
