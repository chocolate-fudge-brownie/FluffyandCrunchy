// Import modules
import React from 'react';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getProduct } from '../store/singleProduct';
import { addProductToCart } from '../store/cart';

// Define component
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product, addProductToCart } = this.props;

    if (product.id !== Number(this.props.match.params.id))
      return <div>Loading...</div>;

    return (
      <div className="card mb-3" id="single-card-component">
        <div className="row g-0" id="card-header">
          <div className="col-md-4">
            <img
              src={product.imageUrl}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" id="single-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Product Price: ${product.price}
                </small>
              </p>
              <button
                className="btn btn-success"
                onClick={() => addProductToCart(product.id, 1)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getProduct: (productId) => dispatch(getProduct(productId)),
    addProductToCart: (productId, quantity) =>
      dispatch(addProductToCart(productId, quantity)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(SingleProduct);
