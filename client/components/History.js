import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrders } from '../store/orders';
import { setOrder } from '../store/singleOrder';
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
		const { orders, setOrder } = this.props;
		console.log(this.props.orders);

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
				{orders.length ? (
					orders.map((order, index) => {
						return (
							<div className="card border-dark mb-3" key={index}>
								<div className="card-header">
									<div className="d-flex justify-content-evenly">
										<p>
											Order Placed:{' '}
											{moment(order.createdAt, 'YYYY-MM-DD').format(
												'MMMM Do, YYYY'
											)}
										</p>
										<p>Order Total: ${order.total + '.00'}</p>
										<p>Order ID#: {`214-7483-${order.id}`}</p>
									</div>
								</div>
								<div className="card-body text-dark">
									<div className="col-md-4">
										<img
											src={order.products[0].imageUrl}
											className="img-thumbnail rounded float-start"
											alt="image of a product related to this order"
											style={{ maxWidth: 100 }}
										/>
									</div>
									<div className="col-md-12 ml-auto">
										<div className="card-body">
											<h5 className="card-title text-center">
												Number Of Products: {order.products.length}
											</h5>
											<p className="card-text text-center">
												Click on View Order Details for more information on
												previously purchased items and their prices at the time
												of purchase.
											</p>
										</div>
									</div>
								</div>
								<div className="card-footer text-dark border-success">
									<Link to="/details">
										<button type="button" className="btn btn-secondary btn-md" onClick={(order) => setOrder(order)} >
											View Order Details
										</button>
									</Link>
								</div>
							</div>
						);
					})
				) : (
					<h1 class="text-center">Whoop! No orders have been made yet! : (</h1>
				)}
			</div>
		);
	}
}
const mapState = (state) => ({
	userId: state.auth.id,
	orders: state.orders,
    order: state.order
});

const mapDispatch = (dispatch) => ({
	fetchOrders: (id) => dispatch(getOrders(id)),
    setOrder: (order) => dispatch(setOrder(order))
});

export default connect(mapState, mapDispatch)(History);
