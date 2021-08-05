// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Redux action & thunk creators
import { logout } from '../store';
import { clearStorage } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn }) => (
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
          <li className="nav-item">
            <Link to="/cart">
              <p className="nav-link">
                Cart <i className="bi bi-cart2"></i>
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
