/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginStart } from '../../../redux/actions/auth';
import { clearLoginState } from '../../../redux/actions/ui';
import Input from '../../Layout/Input/Input';
import './Login.css';
import { updateObject, checkValidity } from '../../../shared/utility';
class Login extends Component {
  state = {
    login: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    messages: null,
    redirect: false,
  };
  componentWillUnmount() {
    const { clearLoginState } = this.props;
    clearLoginState();
  }
  inputChangeHandler = (event, controlName) => {
    const { login } = this.state;
    const updatedControls = updateObject(login, {
      [controlName]: updateObject(login[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, login[controlName].validation),
        touched: true,
      }),
    });
    let formIsValid = true;
    Object.entries(updatedControls).forEach(key => {
      formIsValid = key[1].valid && formIsValid;
    });

    this.setState({ login: updatedControls, messages: null, formIsValid });
  };

  submitHandler = async event => {
    const { email, password } = this.state.login;
    const { loginStart } = this.props;
    const formData = {
      email: email.value,
      password: password.value,
    };
    loginStart(formData);
  };

  render() {
    const { redirect, message, admin, user, path } = this.props;
    const { login } = this.state;
    let checkRedirect = null;
    if (redirect) {
      checkRedirect = admin ? (
        <Redirect to="/dashboard" />
      ) : user ? (
        <Redirect to="/userarea" />
      ) : null;
    }

    const formElementArray = [];
    Object.entries(login).forEach(key => {
      formElementArray.push({
        id: [key[0]],
        config: { ...key[1] },
      });
    });
    const form = formElementArray.map(formElement => (
      <div className="form-group" key={formElement.id}>
        <label
          className="formLoginLabel"
          htmlFor={formElement.config.elementConfig.placeholder}
        >
          {formElement.config.elementConfig.placeholder}
        </label>
        <Input
          id={formElement.config.elementConfig.placeholder}
          key={formElement.id}
          changed={event => this.inputChangeHandler(event, formElement.id)}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      </div>
    ));

    return (
      <div className="loginPage">
        {path && <Redirect to={path} />}
        {checkRedirect}
        <div className="form-group loginForm">
          <h2 className="logintitle">Login</h2>
          <form className="RegisterForm" onSubmit={this.submitHandler}>
            {form}
            <button
              type="button"
              className="btn btn-success"
              style={{ width: '50%', marginRight: '25%' }}
              onClick={this.submitHandler}
            >
              Login
            </button>
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
const mapStateToProps = state => {
  return {
    message: state.ui.message,
    path: state.ui.redirect,
  };
};
export default connect(
  mapStateToProps,
  { loginStart, clearLoginState },
)(Login);
