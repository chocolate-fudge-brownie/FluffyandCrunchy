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
            <div>
                {cartProducts.map((product) => (
                    <div key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <img src={product.imageUrl} />
                        </Link>
                        <Link to={`/products/${product.id}`}>
                            <p>{product.name}</p>
                        </Link>
                        <p>{product.price}</p>
                        <p>Quantity: {cart[product.id]}</p>
                        <button
                            onClick={() => removeProductFromCart(product.id)}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => checkOut(cart)}
                    className="btn btn-success"
                ></button>
            </div>
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
