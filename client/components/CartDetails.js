// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getProducts } from '../store/products';
import {
  checkOut,
  getCartProducts,
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
    await this.props.getProducts();
    this.props.getCartProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ isLoading: false });
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
    const { userId, products, cart, removeFromCart } = this.props;

    if (isLoading) return <p>Loading...</p>;
    if (checkedOut) return <OrderConfirmation />;

    const [cartProducts, totalItems, totalPrice] = this.handleCart(
      products,
      cart
    );

    if (totalItems === 0) return <p>Your cart is empty</p>;

    return (
      <>
        {cartProducts.map((product) => (
          <div
            key={product.id}
            className="card mb-3"
            style={{ maxWidth: '540px' }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.imageUrl}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price ${product.price}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Quantity: {cart[product.id]}
                    </small>
                  </p>
                  <button
                    className="btn btn-warning"
                    onClick={() => removeFromCart(product.id, userId)}
                  >
                    Remove from Cart
                  </button>
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
      </>
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
    removeFromCart: (productId, userId) =>
      dispatch(removeProductFromCart(productId, userId)),
    checkOut: (userId) => dispatch(checkOut(userId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
