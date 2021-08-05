import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GET_PRODUCT = 'GET_PRODUCT';

/**
 * ACTION CREATORS
 */

const _getProduct = (product) => ({ type: GET_PRODUCT, product });

/**
 * THUNK CREATORS
 */

export const getProduct = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch(_getProduct(data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        default:
            return state;
    }
}
