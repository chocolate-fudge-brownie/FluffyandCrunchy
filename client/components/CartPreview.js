// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getCartProducts } from '../store/cart';

// Define component
class CartPreview extends React.Component {
  componentDidMount() {
    this.props.getCartProducts();
  }

  render() {
    const { cart } = this.props;

    return (
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
            </Link>
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
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
