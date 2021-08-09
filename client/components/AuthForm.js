import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="main-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            className="form-control"
            required
          />
        </div>
        {name === 'signup' ? (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="text"
              id="email"
              className="form-control"
              required
            />
          </div>
        ) : null}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {displayName}
        </button>
        {error && error.response && (
          <div>
            {error.response.data.includes('Validation error:') ? (
              error.response.data
                .split('Validation error:')
                .slice(1)
                .map((error, index) => (
                  <div key={index} className="alert alert-danger" role="alert">
                    Validation error: {error.replace(',', '.')}
                  </div>
                ))
            ) : (
              <div className="alert alert-danger" role="alert">
                {error.response.data}
              </div>
            )}
            <br />
          </div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const email = evt.target.email ? evt.target.email.value : '';
      const password = evt.target.password.value;
      dispatch(authenticate(username, email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
