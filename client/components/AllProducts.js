// Import modules
import React from 'react';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
// import { fetchProducts } from '../store/'

// Define component
class AllProducts extends React.Component {
  componentDidMount() {
    // this.props.fetchProducts();
  }

  render() {
    const products = this.props.prodcuts;
    return (
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.imageUrl} />
            <p>{product.name}</p>
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
    // fetchProducts: () => dispatch(fetchProducts()),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(AllProducts);
