// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

// Import Redux action & thunk creators
import { getProducts } from '../store/products';
import {
  checkOut,
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
} from '../store/cart';

// Import components
import OrderConfirmation from './OrderConfirmation';

// Define component
class CartPreview extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedOut: false,
      isLoading: true,
    };
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.getProducts();
      await this.props.getCartProducts();
      this.setState({ isLoading: false });
    } catch (err) {
      console.log(err);
    }
  }

  // get all products info in the cart & calculate total items & price
  handleCart(products, cart) {
    let cartProducts = [];
    let totalItems = 0;
    let totalPrice = 0;
    for (let productId in cart) {
      const product = products.find(
        (product) => product.id === Number(productId)
      );
      cartProducts.push(product);
      totalItems += cart[productId];
      totalPrice += product.price * cart[productId];
    }
    return [cartProducts, totalItems, totalPrice];
  }

  async handleCheckout() {
    const { userId, checkOut } = this.props;
    await checkOut(userId);
    this.setState({ checkedOut: true });
  }

  render() {
    const { isLoading, checkedOut } = this.state;
    if (checkedOut) return <OrderConfirmation />;

    // show loading spinner when fetching data
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" />
        </div>
      );
    }

    const { userId, products, cart, addProductToCart, removeFromCart } =
      this.props;
    const [cartProducts, totalItems, totalPrice] = this.handleCart(
      products,
      cart
    );

    return (
      <div className="cart-details">
        <h1>Cart</h1>
        {totalItems === 0 ? (
          <div id="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products">
              <button className="btn btn-primary">See More Products</button>
            </Link>
          </div>
        ) : (
          <div>
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="card mb-3"
                style={{ maxWidth: '540px' }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.imageUrl}
                        className="img-fluid rounded-start"
                      />
                    </Link>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <Link to={`/products/${product.id}`}>
                        <h5 className="card-title">{product.name}</h5>
                      </Link>
                      <p className="card-text">Price: ${product.price}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Quantity: {cart[product.id]}
                        </small>
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
            ))}
            <p>Items: {totalItems}</p>
            <p>Total Amount: ${totalPrice}</p>
            <button onClick={this.handleCheckout} className="btn btn-success">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    userId: state.auth.id,
    products: state.products,
    cart: state.cart,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCartProducts: () => dispatch(getCartProducts()),
    addProductToCart: (productId, userId) =>
      dispatch(addProductToCart(productId, userId)),
    removeFromCart: (productId, userId) =>
      dispatch(removeProductFromCart(productId, userId)),
    checkOut: (userId) => dispatch(checkOut(userId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
