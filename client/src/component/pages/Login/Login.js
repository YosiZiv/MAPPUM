/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginStart, setLoginFields } from '../../../redux/actions/auth';
import { clearLoginState } from '../../../redux/actions/ui';
import Input from '../../Layout/TextInput/TextInput';
import Message from '../../Layout/Message/Message';
import './Login.css';
import PropTypes from 'prop-types';

class Login extends Component {
  componentWillUnmount() {
    const { clearLoginState } = this.props;
    clearLoginState();
  }
  handleInputChange = ({ id, value, validation }) => {
    const { setLoginFields } = this.props;
    setLoginFields({ id, value, validation });
  };

  submitHandler = async event => {
    const { loginStart, loginForm } = this.props;
    const userData = {
      email: loginForm['email'] ? loginForm.email.value : '',
      password: loginForm['password'] ? loginForm.password.value : '',
    };
    loginStart(userData);
  };

  render() {
    const { loading, loginForm, redirectPath, message } = this.props;
    const { email, password } = loginForm;
    return (
      <div className="loginPage">
        {redirectPath && <Redirect to={redirectPath} />}
        <div className="form-group loginForm">
          <h2 className="logintitle">Login</h2>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
                  <Input
                    isValid={email ? email.isValid : true}
                    className="form-control"
                    id="email"
                    name="Email"
                    type="text"
                    error={message && message.email}
                    required
                    disabled={loading}
                    defaultValue={email && email.value}
                    inputChange={this.handleInputChange}
                    validation={{ isRequired: true, isEmail: true }}
                  />
                  <Input
                    isValid={password ? password.isValid : true}
                    className="form-control"
                    id="password"
                    name="Password"
                    type="password"
                    error={message && message.password}
                    required
                    disabled={loading}
                    defaultValue={password && password.value}
                    inputChange={this.handleInputChange}
                    validation={{ isRequired: true, minLength: 6 }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success mt-5 form-control"
                  onClick={this.submitHandler}
                >
                  Login
                </button>
              </div>
            </div>
            {message
              ? message.global && <Message message={message.global} />
              : null}
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
