// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { me, updateAccount } from '../store';

// Define component
class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
    this.changeToEditMode = this.changeToEditMode.bind(this);
    this.cancelEditMode = this.cancelEditMode.bind(this);
  }

  componentDidUpdate(prevProps) {
    // back to non-editing mode after user update their info successfully
    if (prevProps.auth !== this.props.auth && !this.props.auth.error) {
      document.getElementById('update-user-form').reset();
      this.setState({ editMode: false });
    }
  }

  changeToEditMode() {
    this.setState({ editMode: true });
  }

  async cancelEditMode() {
    // reset the auth state when canceling submission with error in state
    await this.props.cancelSubmit();
    document.getElementById('update-user-form').reset();
    this.setState({ editMode: false });
  }

  render() {
    const { changeToEditMode, cancelEditMode } = this;
    const { editMode } = this.state;
    const { id, username, email, error } = this.props.auth;
    const { handleSubmit } = this.props;

    return (
      <div id="user-profile">
        <div id="user-profile-title">
          <h2>Account Details</h2>
          {editMode ? null : (
            <i className="bi bi-pencil-square" onClick={changeToEditMode}></i>
          )}
        </div>
        <hr />
        <form id="update-user-form" onSubmit={(evt) => handleSubmit(evt, id)}>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username:
            </label>
            <div className="col-sm-10">
              <input
                name="username"
                type="text"
                id="username"
                className={editMode ? 'form-control' : 'form-control-plaintext'}
                required={editMode}
                readOnly={!editMode}
                placeholder={editMode ? null : username}
                defaultValue={editMode ? username : null}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                name="email"
                type="text"
                id="email"
                className={editMode ? 'form-control' : 'form-control-plaintext'}
                required={editMode}
                readOnly={!editMode}
                placeholder={editMode ? null : email}
                defaultValue={editMode ? email : null}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                name="password"
                type="password"
                id="password"
                className={editMode ? 'form-control' : 'form-control-plaintext'}
                required={editMode}
                readOnly={!editMode}
                placeholder={editMode ? null : '********'}
              />
            </div>
          </div>
          {editMode ? (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={cancelEditMode}
              >
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
    handleSubmit(evt, userId) {
      evt.preventDefault();
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(updateAccount(username, email, password, userId));
    },
    cancelSubmit() {
      dispatch(me());
    },
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(UserProfile);
