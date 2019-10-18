/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchUser from '../../../../Layout/SearchUser/SeachUser';
import RegisterUser from '../../../../Layout/RegisterUser/RegisterUser';
import Spinner from '../../../../Layout/Spinners/Spinners';
import './Register.css';
import {
  registerStart,
  searchUser,
  setRegisterFields,
  switchRegisterMode,
} from '../../../../../redux/actions/register';
import { changeSellStage } from '../../../../../redux/actions/sell';
class Register extends Component {
  switchMode = () => {
    const { switchRegisterMode } = this.props;
    switchRegisterMode();
  };
  registerInputChange = ({ id, value, validation }) => {
    const { setRegisterFields } = this.props;
    setRegisterFields({ id, value, validation });
  };
  searchInputChange = ({ id, value, validation }) => {
    const { setRegisterFields } = this.props;
    setRegisterFields({ id, value, validation });
  };
  registerSubmitHandler = async event => {
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
    const {
      user,
      loading,
      registerForm,
      redirect,
      message,
      mode,
      searchForm,
    } = this.props;
    return (
      <div className="container create-user-page" style={{ width: ' 50vw' }}>
        {redirect && <Redirect to={redirect} />}
        <div className="modeContainer">
          <p>
            Switch to
            <label onClick={this.switchMode}>
              {mode ? 'Search User' : 'Register New'}
            </label>
          </p>
        </div>
        {mode ? (
          <RegisterUser
            message={message}
            formSubmit={this.registerSubmitHandler}
            inputChange={this.registerInputChange}
            registerUserForm={registerForm}
          />
        ) : (
          <SearchUser
            changeSellStage={changeSellStage}
            user={user}
            submit={this.searchUserHandler}
            searchForm={searchForm}
          />
        )}
        {message
          ? message.global && (
              <div className="globalError">
                <p>* {message.global.toUpperCase()}</p>
              </div>
            )
          : null}
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
    searchForm: state.register.searchForm,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
    mode: state.register.mode,
  };
};

export default connect(
  mapStateToProps,
  {
    registerStart,
    searchUser,
    setRegisterFields,
    switchRegisterMode,
    changeSellStage,
  },
)(Register);
