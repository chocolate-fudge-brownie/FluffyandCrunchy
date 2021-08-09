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
    this.props.mergeCart(this.props.userId, false);
  }

  componentDidUpdate(prevProps) {
    // merge cart when user log in first time
    console.log(this.state.loggedInBefore);
    console.log('prevPops', prevProps.isLoggedIn);
    console.log('currentProps', this.props.isLoggedIn);

    if (
      !this.state.loggedInBefore &&
      !prevProps.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      this.props.mergeCart(this.props.userId, false);
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
    mergeCart: (userId) => dispatch(mergeCart(userId)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
