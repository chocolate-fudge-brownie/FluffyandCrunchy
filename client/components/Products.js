// Import modules
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Import Redux action & thunk creators
import { getProducts } from "../store/products";
import { addProductToCart } from "../store/cart";

// Define component
class Products extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products, addProductToCart } = this.props;
        return (
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div className="col">
                        <div className="card" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.imageUrl}
                                    className="card-img-top"
                                />
                            </Link>
                            <div className="card-body">
                                <Link to={`/products/${product.id}`}>
                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>
                                </Link>
                                <p className="card-text">${product.price}</p>
                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        addProductToCart(product.id, 1)
                                    }
                                >
                                    Add to Cart
                                </button>
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
        products: state.products,
    };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        addProductToCart: (productId, quantity) =>
            dispatch(addProductToCart(productId, quantity)),
    };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(Products);
