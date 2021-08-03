import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GET_PRODUCTS = 'GET_PRODUCTS';

/**
 * ACTION CREATORS
 */

const _getProducts = (products) => ({ type: GET_PRODUCTS, products });

/**
 * THUNK CREATORS
 */

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/products');
        dispatch(_getProducts(data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return [...state, action.products];
        default:
            return state;
    }
}
