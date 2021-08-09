// Import modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

// Import components
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import CartDetails from './components/CartDetails';
import SearchResults from './components/SearchResults';

// Import Redux functions
import { me } from './store';
import { mergeCart } from './store/cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      loggedInBefore: !!window.localStorage.getItem('token'),
    };
  }

  async componentDidMount() {
    await this.props.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.loggedInBefore &&
      !prevProps.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      // merge local & db cart if user log in first time
      this.props.mergeCart(this.props.userId, false);
    } else if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      // get cart from db only if user logged in before
      this.props.mergeCart(this.props.userId, true);
    }

    if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
      // reset loggedInBefore status when user log out
      this.setState({ loggedInBefore: false });
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/products" exact component={Products} />
            <Route
              path="/products/search/:query"
              exact
              component={SearchResults}
            />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={CartDetails} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route
              path="/products/search/:query"
              exact
              component={SearchResults}
            />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={CartDetails} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
          </Switch>
        )}
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    mergeCart: (userId, loggedInBefore) =>
      dispatch(mergeCart(userId, loggedInBefore)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
