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
import Loader from 'react-loader-spinner';

// Import Redux functions
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.props.loadInitialData()
    .then(() => this.setState({ isLoading: false })
    .catch((err) => console.log(err)))
  }
  render() {
    const { isLoggedIn } = this.props;
    const { isLoading } = this.state;
    if(isLoading) { 
      return (
        <div className='d-flex justify-content-center'>
          <Loader type="ThreeDots" />
        </div>
      )
    }
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    async loadInitialData() {
      await dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
