/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchUser from '../../../../Layout/SearchUser/SeachUser';
import SignUser from '../../../../Layout/SignUser/SignUser';
import Input from '../../../../Layout/TextInput/TextInput';
import Spinner from '../../../../Layout/Spinners/Spinners';
import './Register.css';
import {
  registerStart,
  searchUser,
  setRegisterFields,
} from '../../../../../redux/actions/register';
class Register extends Component {
  // state = {
  //   register: {
  //     firstName: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'text',
  //         placeholder: 'First Name',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 2,
  //         maxLength: 30,
  //       },
  //     },
  //     lastName: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'text',
  //         placeholder: 'Last Name',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 2,
  //         maxLength: 30,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     zahot: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'number',
  //         placeholder: 'Id',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 8,
  //         maxLength: 9,
  //         isNumeric: true,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     phone: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'text',
  //         placeholder: 'Phone',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 6,
  //         maxLength: 30,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     address: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'text',
  //         placeholder: 'Adress',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 2,
  //         maxLength: 60,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //     email: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'email',
  //         placeholder: 'Email',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         isEmail: true,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //   },
  //   searchUser: {
  //     email: {
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'email',
  //         placeholder: 'Email',
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         isEmail: true,
  //       },
  //       valid: false,
  //       touched: false,
  //     },
  //   },
  //   mode: 'new',
  //   formIsValid: false,
  //   messages: null,
  //   redirectTo: false,
  // };

  handleInputChange = ({ id, value }) => {
    const { setRegisterFields } = this.props;
    setRegisterFields({ id, value });
  };
  submitHandler = async event => {
    const { registerStart, registerForm } = this.props;
    return registerStart(registerForm);
  };
  render() {
    const { loading, registerForm, redirect, message } = this.props;
    const { firstName, lastName, zahot, phone, address, email } = registerForm;
    return (
      <div className="container create-user-page" style={{ width: ' 50vw' }}>
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center mt-5">
            <h2 className="logintitle">Register</h2>
            <form className="RegisterForm" onSubmit={e => e.preventDefault()}>
              <div className="row mt-5">
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                    disabled={loading}
                    defaultValue={firstName}
                    inputChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    required
                    disabled={loading}
                    defaultValue={lastName}
                    inputChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="zahot"
                    name="zahot"
                    required
                    disabled={loading}
                    defaultValue={zahot}
                    inputChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="phone"
                    name="phone"
                    required
                    disabled={loading}
                    defaultValue={phone}
                    inputChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="address"
                    name="address"
                    required
                    disabled={loading}
                    defaultValue={address}
                    inputChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <Input
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    disabled={loading}
                    defaultValue={email}
                    inputChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <button
                    className="btn btn-success form-control"
                    style={{ width: '80%' }}
                    onClick={this.submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            {redirect && <Redirect to={redirect} />}
            {message && (
              <div className="loginPageMessage">
                {Object.values(message).map(msg => (
                  <p>* {msg.toUpperCase()}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        {loading && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    registerForm: state.register.registerForm,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
  };
};

export default connect(
  mapStateToProps,
  { registerStart, searchUser, setRegisterFields },
)(Register);
