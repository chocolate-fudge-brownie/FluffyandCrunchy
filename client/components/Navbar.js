// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Redux action & thunk creators
import { logout } from '../store';
import { clearStorage, getCartProducts } from '../store/cart';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      cartHover: false,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseRelease = this.mouseRelease.bind(this);
  }

  mouseOver() {
    this.setState({ cartHover: true });
  }

  mouseRelease() {
    this.setState({ cartHover: false });
  }

  componentDidMount() {
    this.props.getCartProducts();
  }

  render() {
    const { handleClick, isLoggedIn, cart, products } = this.props;

    let cartProducts = [];
    for (let productId in cart) {
      cartProducts = [
        ...cartProducts,
        ...products.filter((product) => product.id === Number(productId)),
      ];
    }
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: '#c79e5f' }}
      >
        <div className="container-fluid">
          <Link to={isLoggedIn ? '/home' : '/'}>
            <h1 className="navbar-brand" id="main-header">
              FLUFFY & CRUNCHY
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/home">
                      <p className="nav-link">Home</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#">
                      <p className="nav-link" href="#" onClick={handleClick}>
                        Logout
                      </p>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">
                      <p className="nav-link">
                        Login
                        <i className="bi bi-box-arrow-right"></i>
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup">
                      <p className="nav-link">
                        Sign Up
                        <i className="bi bi-check-circle"></i>
                      </p>
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link to="/products">
                  <p className="nav-link">
                    Products<i className="bi bi-bag"></i>
                  </p>
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => (window.location.href = '/cart')}
                onMouseOver={() => this.mouseOver()}
                onMouseOut={() => this.mouseRelease()}
              >
                <p
                  className={`nav-link dropdown-toggle ${
                    this.state.cartHover ? 'show' : null
                  }`}
                  id="dropdownMenuOffset"
                  data-bs-toggle="dropdown"
                  aria-expanded={this.state.cartHover ? 'true' : 'false'}
                >
                  Cart <i className="bi bi-cart2"></i>
                </p>
                <ul
                  className={`dropdown-menu ${
                    this.state.cartHover ? 'show' : null
                  }`}
                  aria-labelledby="dropdownMenuLink"
                >
                  <li className="dropdown-item">
                    <h1>Currently Added</h1>
                  </li>
                  {cartProducts.map((product) => (
                    <li key={product.id}>
                      <hr />
                      <div className="dropdown-item">
                        <img
                          src={product.imageUrl}
                          className="cart-preview-image"
                        />
                        <p>
                          <strong className="cart-name">{product.name}</strong>
                        </p>
                        <p>
                          <strong>Amount: </strong> {cart[product.id]}
                        </p>
                        <p>
                          <strong>Total price: </strong>$
                          {cart[product.id] * product.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    handleClick() {
      dispatch(logout());
      dispatch(clearStorage());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
