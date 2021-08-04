// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Redux action & thunk creators
import { logout } from '../store';
import { clearStorage } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Link to={isLoggedIn ? '/home' : '/'}>
      <h1>{'Fluffy & Crunchy'}</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <div>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearStorage());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
