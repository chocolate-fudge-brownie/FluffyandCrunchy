import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

class Details extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true
		};
	}
	componentDidMount() {
		this.setState({ isLoading: false });
	}
	render() {
		const { isLoading } = this.state;
		const { order } = this.props;
		if (isLoading) {
			return (
				<div className="d-flex justify-content-center">
					<Loader type="ThreeDots" />
				</div>
			);
		}
		if (order.products !== undefined) {
			return (
				<div className="container-lg">
					{order.products.length ? (
						order.products.map((product, index) => {
							return (
								<div className="card border-dark mb-3" key={index}>
									<div className="card-header">
										<div className="d-flex justify-content-evenly">
											<p>Name: {product.name}</p>
											<p>Product Price: ${product.price + '.00'}</p>
											<p>Product ID: #{product.id}</p>
										</div>
									</div>
									<div className="card-body text-dark">
										<div className="col-md-4">
											<img
												src={product.imageUrl}
												className="img-thumbnail rounded float-start"
												alt="image of a product related to this order"
												style={{ maxWidth: 100 }}
											/>
										</div>
										<div className="col-md-12 ml-auto">
											<div className="card-body">
												<h5 className="card-title text-center">Description:</h5>
												<p className="card-text text-center">
													{product.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<h1 class="text-center">Whoop! No products to be found! : (</h1>
					)}
				</div>
			);
		} else {
            return <h1 className="text-center">Uh oh! Try going back and trying again!</h1>
        }
	}
}
const mapState = (state) => ({
	order: state.singleOrder,
});

export default connect(mapState, null)(Details);
