// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { updateAccount } from '../store';

// Define component
class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
    this.changeEditMode = this.changeEditMode.bind(this);
  }

  changeEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    const { changeEditMode } = this;
    const { editMode } = this.state;
    const { id, username, email, error } = this.props.auth;
    const { handleSubmit } = this.props;

    return (
      <div id="user-profile">
        <div id="user-profile-title">
          <h2>Account Details</h2>
          {editMode ? null : (
            <i className="bi bi-pencil-square" onClick={changeEditMode}></i>
          )}
        </div>
        <hr />
        <form onSubmit={(evt) => handleSubmit(evt, id)}>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username:
            </label>
            <div className="col-sm-10">
              {editMode ? (
                <input
                  name="username"
                  type="text"
                  id="username"
                  className="form-control"
                  required
                  defaultValue={username}
                />
              ) : (
                <input
                  name="username"
                  type="text"
                  id="username"
                  className="form-control-plaintext"
                  readOnly
                  placeholder={username}
                />
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              {editMode ? (
                <input
                  name="email"
                  type="text"
                  id="email"
                  className="form-control"
                  required
                  defaultValue={email}
                />
              ) : (
                <input
                  name="email"
                  type="text"
                  id="email"
                  className="form-control-plaintext"
                  readOnly
                  placeholder={email}
                />
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              {editMode ? (
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="form-control"
                  required
                />
              ) : (
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="form-control-plaintext"
                  readOnly
                  placeholder="********"
                />
              )}
            </div>
          </div>
          {editMode ? (
            <div>
              <button className="btn btn-primary" onClick={changeEditMode}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          ) : null}
          {error && error.response && (
            <div>
              {error.response.data.includes('Validation error:') ? (
                error.response.data
                  .split('Validation error:')
                  .slice(1)
                  .map((error, index) => (
                    <div
                      key={index}
                      className="alert alert-danger"
                      role="alert"
                    >
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
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, id) {
      evt.preventDefault();
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(updateAccount(username, email, password, id));
    },
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(UserProfile);
