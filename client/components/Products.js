// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
          <div className="col" key={product.id} style={{ marginTop: '40px' }}>
            <div className="card">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} className="card-img-top" />
              </Link>
              <div className="card-body">
                <Link to={`/products/${product.id}`}>
                  <h5 className="card-title">{product.name}</h5>
                </Link>
                <p className="card-text">${product.price}</p>
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
