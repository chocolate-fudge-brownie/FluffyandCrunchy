// Import modules
import React from 'react';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
// import { getCart } from '../store/cart';

// Define component
class CartPreview extends React.Component {
  componentDidMount() {
    if (this.state.isLoggedIn) this.props.getCart(this.state.userId);
  }

  render() {
    const { cart } = this.props;

    return (
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <Link to={`/item/${item.id}`}>
              <img src={item.imageUrl} />
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
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    cart: state.cart,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    // getCart: (userId) => dispatch(getCart(userId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
