// Import modules
import React from 'react';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getCartProducts, removeProductFromCart } from '../store/cart';

// Define component
class CartPreview extends React.Component {
  componentDidMount() {
    this.props.getCartProducts();
  }

  render() {
    const { cart, removeProductFromCart } = this.props;

    return (
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} />
            </Link>
            <Link to={`/products/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.price}</p>
            <button onClick={() => removeProductFromCart(product.id)}>
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    removeProductFromCart: () => dispatch(removeProductFromCart()),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
