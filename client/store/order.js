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
    console.log(token);
    const config = {
        headers: {
            authorization: token,
        },
    }
    console.log(typeof userId)
	return async(dispatch) => {
		try {
			const { res: orders } = await axios.get(`http://localhost:8080/api/orders/user/${userId}/`, config);
			console.log(orders);
            dispatch(_getOrders(orders));
            
		} catch (err) {}
	};
};

/**
 * REDUCERS
 */

export default function(state = [], action) {
    switch (action.type){
        case GET_ORDERS:
            return action.orders;
        default:
            return state;        
    }
}