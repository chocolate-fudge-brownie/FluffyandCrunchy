import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../store/order';
import Loader from 'react-loader-spinner';

class History extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }
    async componentDidMount() {
        const { userId, fetchOrders } = this.props;
        await fetchOrders(userId);
        this.setState({ isLoading: false });
    }
    render() {
        const { isLoading } = this.state;
        console.log(this.props.orders)
        if(isLoading) { 
            return (
              <div className='d-flex justify-content-center'>
                <Loader type="ThreeDots" />
              </div>
            )
        }
        return (
            <h1>History</h1>
        );
    }
}
const mapState = (state) => ({
    userId: state.auth.id,
    orders: state.orders
})

const mapDispatch = (dispatch) => ({
    fetchOrders: (id) => dispatch(getOrders(id))
})

export default connect(mapState, mapDispatch)(History);