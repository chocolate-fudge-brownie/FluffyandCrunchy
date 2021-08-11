/**
 * ACTION TYPES
 */
const SET_ORDER = 'SET_ORDER';

/**
 * ACTION CREATORS
 */
const _setOrder = (order) => ({
	type: SET_ORDER,
	order,
});

/**
 * THUNK
 */

export const setOrder = (order) => {  
    const token = window.localStorage.getItem('token');
    if(!token) throw new Error('token no longer valid');
	return (dispatch) => {
		try {
            dispatch(_setOrder(order));     
		} catch (err) {
            console.log('Unable to set user order.')
        }
	};
};

/**
 * REDUCERS
 */

export default function(state = {}, action) {
    switch (action.type){
        case SET_ORDER:
            return action.order;
        default:
            return state;        
    }
}