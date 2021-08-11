// Import modules
import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import history from '../history';

// Import Redux action & thunk creators
import { getProduct } from '../store/singleProduct';
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
} from '../store/cart';

// Define component
class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      imgLoaded: false,
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  async componentDidMount() {
    try {
      // fetch for product if params is a valid number (e.g. /products/1)
      const { id } = this.props.match.params;
      if (Number(id)) {
        await this.props.getProduct(id);
        this.setState({ isLoading: false });
      } else {
        // redirect to all-products page if params not a valid number (e.g. /products/banana)
        history.push('/products');
      }
    } catch (err) {
      // redirect to all-products page if no products found with given id
      console.log(err);
      history.push('/products');
    }
  }

  handleLoad() {
    this.setState({ loaded: true });
  }

  render() {
    const { userId, product, cart, addProductToCart, removeFromCart } =
      this.props;
    const { isLoading } = this.state;

    // show loading spinner when fetching data
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" />
        </div>
      );
    }

    return (
      <div className="card mb-3" id="single-card-component">
        <div className="row g-0" id="card-header">
          <div className="col-md-4" id="card-header-img">
            <img
              onLoad={this.handleLoad}
              src={product.imageUrl}
              className="img-fluid rounded-start"
              alt="..."
              style={
                this.state.loaded
                  ? { display: 'inline-block' }
                  : { display: 'none' }
              }
            />
            <div className="spinner-container">
              <div
                className="spinner-border text-primary"
                role="status"
                style={
                  this.state.loaded
                    ? { display: 'none' }
                    : {
                        display: 'inline-block',
                        width: '200px',
                        height: '200px',
                      }
                }
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body" id="single-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-muted">Price: ${product.price}</small>
              </p>
              <div className="plus-minus-buttons">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    removeFromCart(product.id, userId);
                    getCartProducts();
                  }}
                >
                  -
                </button>
                <p>{cart[product.id] || 0}</p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    addProductToCart(product.id, userId);
                    getCartProducts();
                  }}
                >
                  +
                </button>
              </div>
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
    userId: state.auth.id,
    product: state.singleProduct,
    cart: state.cart,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getProduct: (productId) => dispatch(getProduct(productId)),
    getCartProducts: () => dispatch(getCartProducts()),
    removeFromCart: (productId, userId) =>
      dispatch(removeProductFromCart(productId, userId)),
    addProductToCart: (productId, userId) =>
      dispatch(addProductToCart(productId, userId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(SingleProduct);
