/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchUser from '../../../../Layout/SearchUser/SeachUser';
import Input from '../../../../Layout/TextInput/TextInput';
import Spinner from '../../../../Layout/Spinners/Spinners';
import './Register.css';
import {
  registerStart,
  searchUser,
  setRegisterFields,
  switchRegisterMode,
} from '../../../../../redux/actions/register';
class Register extends Component {
  switchMode = () => {
    const { switchRegisterMode } = this.props;
    switchRegisterMode();
  };
  handleInputChange = ({ id, value, validation }) => {
    const { setRegisterFields } = this.props;
    setRegisterFields({ id, value, validation });
  };
  submitHandler = async event => {
    const { registerStart, registerForm } = this.props;
    const registerData = {
      firstName: registerForm['firstName'] ? registerForm.firstName.value : '',
      lastName: registerForm['lastName'] ? registerForm.lastName.value : '',
      zahot: registerForm['zahot'] ? registerForm.zahot.value : '',
      phone: registerForm['phone'] ? registerForm.phone.value : '',
      address: registerForm['address'] ? registerForm.address.value : '',
      email: registerForm['email'] ? registerForm.email.value : '',
    };
    return registerStart(registerData);
  };
  searchUserHandler = email => {
    const { searchUser, registerForm } = this.props;
    const registerFormData = {
      email: registerForm.email.value,
    };
    searchUser(registerFormData);
  };
  render() {
    const { user, loading, registerForm, redirect, message, mode } = this.props;
    const { firstName, lastName, zahot, phone, address, email } = registerForm;
    const searchUserForm = (
      <Input
        isValid={firstName ? firstName.isValid : true}
        className="form-control"
        id="email"
        name="email"
        error={message && message.email}
        required
        disabled={loading}
        defaultValue={email && email.value}
        inputChange={this.handleInputChange}
        validation={{
          isRequired: true,
          isEmail: true,
        }}
      />
    );
    return (
      <div className="container create-user-page" style={{ width: ' 50vw' }}>
        <div className="modeContainer">
          <button onClick={this.switchMode} className="btn btn-primary">
            {mode ? 'Search User' : 'Register New'}
          </button>
        </div>
        {mode ? (
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center mt-5">
              <h2 className="logintitle">Register</h2>
              <form className="RegisterForm" onSubmit={e => e.preventDefault()}>
                <div className="row mt-5">
                  <div className="col-6">
                    <Input
                      isValid={firstName ? firstName.isValid : true}
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      type="text"
                      error={message && message.firstName}
                      required
                      disabled={loading}
                      defaultValue={firstName && firstName.value}
                      inputChange={this.handleInputChange}
                      validation={{
                        isRequired: true,
                        minLength: 2,
                        maxLength: 256,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      isValid={lastName ? lastName.isValid : true}
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      type="text"
                      error={message && message.lastName}
                      required
                      disabled={loading}
                      defaultValue={lastName && lastName.value}
                      inputChange={this.handleInputChange}
                      validation={{
                        isRequired: true,
                        minLength: 2,
                        maxLength: 256,
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">
                    <Input
                      isValid={zahot ? zahot.isValid : true}
                      className="form-control"
                      id="zahot"
                      name="zahot"
                      type="number"
                      error={message && message.zahot}
                      required
                      disabled={loading}
                      defaultValue={zahot && zahot.value}
                      inputChange={this.handleInputChange}
                      validation={{ isRequired: true, isNumeric: true }}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      isValid={phone ? phone.isValid : true}
                      className="form-control"
                      id="phone"
                      name="phone"
                      type="text"
                      error={message && message.phone}
                      required
                      disabled={loading}
                      defaultValue={phone && phone.value}
                      inputChange={this.handleInputChange}
                      validation={{
                        isRequired: true,
                        minLength: 6,
                        maxLength: 256,
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">
                    <Input
                      isValid={address ? address.isValid : true}
                      className="form-control"
                      id="address"
                      name="address"
                      type="text"
                      error={message && message.address}
                      required
                      disabled={loading}
                      defaultValue={address && address.value}
                      inputChange={this.handleInputChange}
                      validation={{
                        isRequired: true,
                        minLength: 2,
                        maxLength: 256,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      isValid={email ? email.isValid : true}
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      error={message && message.email}
                      required
                      disabled={loading}
                      defaultValue={email && email.value}
                      inputChange={this.handleInputChange}
                      validation={{ isRequired: true, isEmail: true }}
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
              {message
                ? message.global && (
                    <div className="globalError">
                      <p>* {message.global.toUpperCase()}</p>
                    </div>
                  )
                : null}
            </div>
          </div>
        ) : (
          <div>
            <SearchUser
              user={user}
              submit={this.searchUserHandler}
              form={searchUserForm}
            />
          </div>
        )}
        {loading && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}
Register.prop = {
  registerForm: PropTypes.object,
  loading: PropTypes.bool,
  message: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    registerForm: state.register.registerForm,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
    mode: state.register.mode,
  };
};

export default connect(
  mapStateToProps,
  { registerStart, searchUser, setRegisterFields, switchRegisterMode },
)(Register);
