/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginStart, setLoginFields } from '../../../redux/actions/auth';
import { clearLoginState } from '../../../redux/actions/ui';
import Input from '../../Layout/TextInput/TextInput';
import './Login.css';
import PropTypes from 'prop-types';

class Login extends Component {
  componentWillUnmount() {
    const { clearLoginState } = this.props;
    clearLoginState();
  }
  handleInputChange = ({ id, value }) => {
    const { setLoginFields } = this.props;
    console.log('event work', setLoginFields);
    setLoginFields({ id, value });
  };

  submitHandler = async event => {
    const { loginStart, loginForm } = this.props;
    loginStart(loginForm);
  };

  render() {
    const { loading, loginForm, redirectPath, message } = this.props;
    const { email, password } = loginForm;
    console.log('render work', loginForm);
    return (
      <div className="loginPage">
        {redirectPath && <Redirect to={redirectPath} />}
        <div className="form-group loginForm">
          <h2 className="logintitle">Login</h2>
          <form onSubmit={e => e.preventDefault()}>
            <div className="container">
              <div className="row justify-content-center">
                <form className="form">
                  <div className="col">
                    <Input
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      disabled={loading}
                      defaultValue={email}
                      inputChange={this.handleInputChange}
                    />
                    <Input
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      disabled={loading}
                      defaultValue={password}
                      inputChange={this.handleInputChange}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success mt-5 form-control"
                    onClick={this.submitHandler}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            {message && (
              <div className="loginPageMessage">
                {Object.values(message).map(msg => (
                  <p>* {msg.toUpperCase()}</p>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
Login.prop = {
  loading: PropTypes.bool,
  message: PropTypes.string,
  loginForm: PropTypes.object.isRequired,
  redirectPath: PropTypes.string,
};
const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    message: state.ui.message,
    redirectPath: state.ui.redirect,
    loginForm: state.auth.loginForm,
  };
};
export default connect(
  mapStateToProps,
  { loginStart, clearLoginState, setLoginFields },
)(Login);
