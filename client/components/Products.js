// Import modules
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getProducts } from '../store/products';

// Define component
class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} />
            </Link>
            <Link to={`/product/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    products: state.products,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(Products);