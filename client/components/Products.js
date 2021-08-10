// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

// Import Redux action & thunk creators
import { getProducts } from '../store/products';
import {
  addProductToCart,
  getCartProducts,
  removeProductFromCart,
} from '../store/cart';

// Define component
class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const {
      userId,
      products,
      cart,
      addProductToCart,
      getCartProducts,
      removeFromCart,
    } = this.props;

    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userId={userId}
            addProductToCart={addProductToCart}
            getCartProducts={getCartProducts}
            cart={cart}
            removeFromCart={removeFromCart}
          />
        ))}
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
    getCartProducts: () => dispatch(getCartProducts()),
    getProducts: () => dispatch(getProducts()),
    addProductToCart: (productId, userId) =>
      dispatch(addProductToCart(productId, userId)),
    removeFromCart: (productId, userId) =>
      dispatch(removeProductFromCart(productId, userId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(Products);
