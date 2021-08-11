import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../store/order';
import Loader from 'react-loader-spinner';
import moment from 'moment';

class History extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
		};
	}
	async componentDidMount() {
		const { userId, fetchOrders } = this.props;
		await fetchOrders(userId);
		this.setState({ isLoading: false });
	}
	render() {
		const { isLoading } = this.state;
		const { orders } = this.props;
        console.log(this.props.orders);
		console.log(!isLoading ? moment(orders[0].createdAt, "YYYY-MM-DD").format("MMMM Do YYYY") : '');
        
		// this.props.orders[0].isPaid
		if (isLoading) {
			return (
				<div className="d-flex justify-content-center">
					<Loader type="ThreeDots" />
				</div>
			);
		}
		return (
			<div className="container-lg">
				{orders.length ? orders.map((order, index) => {
					return (
						<div className="card border-dark mb-3" key={index}>
							<div className="card-header">
								<div className="d-flex justify-content-evenly">
									<p>Order Placed: {moment(order.createdAt, "YYYY-MM-DD").format("MMMM Do YYYY")}</p>
									<p>Order Total: ${order.total + '.00'}</p>
									<p>Order ID#: {`214-7483-${order.id}`}</p>
								</div>
							</div>
							<div className="card-body text-dark">
								<h5 className="card-title">Dark card title</h5>
								<p className="card-text">
									Some quick example text to build on the card title and make up
									the bulk of the card's content.
								</p>
							</div>
							<div className="card-footer text-dark border-success">
								<a href="#" className="btn btn-secondary btn-md" role="button">
									View Order Details
								</a>
							</div>
						</div>
					);
				}): <h1 class="text-center">Whoop! No orders have been made yet! : (</h1> }
			</div>
		);
	}
}
const mapState = (state) => ({
	userId: state.auth.id,
	orders: state.orders,
});

const mapDispatch = (dispatch) => ({
	fetchOrders: (id) => dispatch(getOrders(id)),
});

export default connect(mapState, mapDispatch)(History);
