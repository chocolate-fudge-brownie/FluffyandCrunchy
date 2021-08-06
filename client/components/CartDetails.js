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

// Define component
class CartPreview extends React.Component {
    async componentDidMount() {
        await this.props.getProducts();
        this.props.getCartProducts();
    }

    render() {
        const { products, cart, removeProductFromCart, checkOut } = this.props;

        let cartProducts = [];
        for (let productId in cart) {
            cartProducts = [
                ...cartProducts,
                ...products.filter(
                    (product) => product.id === Number(productId)
                ),
            ];
        }

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
                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>
                                    <p className="card-text">
                                        Price ${product.price}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Quantity: {cart[product.id]}
                                        </small>
                                    </p>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            removeProductFromCart(product.id)
                                        }
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => checkOut(cart)}
                    className="btn btn-success"
                >
                    CHECKOUT
                </button>
            </>
        );
    }
}

// Connect Redux store's state to props
const mapState = (state) => {
    return {
        products: state.products,
        cart: state.cart,
    };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
    return {
        checkOut: (cart) => dispatch(checkOut(cart)),
        getProducts: () => dispatch(getProducts()),
        getCartProducts: () => dispatch(getCartProducts()),
        removeProductFromCart: (productId) =>
            dispatch(removeProductFromCart(productId)),
    };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(CartPreview);
