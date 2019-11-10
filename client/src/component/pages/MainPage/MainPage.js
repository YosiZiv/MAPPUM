import React, { Component } from 'react';
import { connect } from 'react-redux';
import SlideIn from '../../Layout/SlideIn/SlideIn';
import './MainPage.css';
import MainPageImg from '../../../assets/images/MainPageImage.jpg';
import RegisterAdmin from '../../Layout/RegisterUser/RegisterUser';
import Message from '../../Layout/Message/Message';
import {
  inputHandle,
  userRegisterStart,
} from '../../../redux/actions/register';
class MainPage extends Component {
  state = {
    open: false,
  };
  popupToggle = () => {
    this.setState({ open: !this.state.open });
  };
  userInputChange = ({ id, value, validation }) => {
    const { inputHandle, message } = this.props;
    inputHandle({ id, value, validation, message });
  };

  formSubmit = async event => {
    const { userRegisterStart, registerForm } = this.props;
    const registerData = {
      firstName: registerForm['firstName'] ? registerForm.firstName.value : '',
      lastName: registerForm['lastName'] ? registerForm.lastName.value : '',
      phone: registerForm['phone'] ? registerForm.phone.value : '',
      email: registerForm['email'] ? registerForm.email.value : '',
      password: registerForm['password'] ? registerForm.password.value : '',
      passwordConfirm: registerForm['passwordConfirm']
        ? registerForm.passwordConfirm.value
        : '',
    };
    return userRegisterStart(registerData);
  };
  render() {
    const { registerForm, redirect, message, loading } = this.props;
    const { open } = this.state;
    return (
      <div
        className="MainPageBackground"
        style={{
          backgroundImage: `url(${MainPageImg})`,
        }}
      >
        <div className="MainPageContent">
          <h2>MPPUM</h2>
          <p>My Pivate Product User Managment </p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.popupToggle}
          >
            Become A Manager
          </button>
        </div>
        <SlideIn open={open}>
          <RegisterAdmin
            closeForm={this.popupToggle}
            loading={loading}
            message={message}
            formSubmit={this.formSubmit}
            inputChange={this.userInputChange}
            registerForm={registerForm}
          />
          <Message message={message} />
        </SlideIn>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    registerForm: state.register.registerForm,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
  };
};
export default connect(
  mapStateToProps,
  { inputHandle, userRegisterStart },
)(MainPage);
