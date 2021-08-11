import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */
const _getOrders = (orders) => ({
	type: GET_ORDERS,
	orders,
});

/**
 * THUNK
 */

export const getOrders = (userId) => {  
    const token = window.localStorage.getItem('token');
    const config = {
        headers: {
            authorization: token,
        },
    }
	return async(dispatch) => {
		try {
			const { data: orders } = await axios.get(`http://localhost:8080/api/orders/user/${userId}/`, config);
            dispatch(_getOrders(orders));     
		} catch (err) {
            console.log('Unable to get user orders.')
        }
	};
};

/**
 * REDUCERS
 */

export default function(state = [], action) {
    switch (action.type){
        case GET_ORDERS:
            return action.orders.filter((order) => order.isPaid === true);
        default:
            return state;        
    }
}