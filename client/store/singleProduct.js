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
    const { data } = await axios.get(`/api/products/${id}`);
    return dispatch(_getProduct(data));
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return { ...state, ...action.product };
        default:
            return state;
    }
}
