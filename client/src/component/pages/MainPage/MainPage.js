import React, { Component } from 'react';
import { connect } from 'react-redux';
import SlideIn from '../../Layout/SlideIn/SlideIn';
import './MainPage.css';
import MainPageImg from '../../../assets/images/MainPageImage.jpg';
import RegisterAdmin from '../../Layout/RegisterAdmin/RegisterAdmin';
import Message from '../../Layout/Message/Message';
import {
  adminSetFieldsMid,
  adminRegisterStart,
} from '../../../redux/actions/register';
class MainPage extends Component {
  state = {
    open: false,
  };
  popupToggle = () => {
    this.setState({ open: !this.state.open });
  };
  adminRegisterInputChange = ({ id, value, validation }) => {
    const { adminSetFieldsMid } = this.props;
    adminSetFieldsMid({ id, value, validation });
  };

  adminRegisterSubmitHandler = async event => {
    const { adminRegisterStart, adminRegisterForm } = this.props;
    const registerData = {
      firstName: adminRegisterForm['firstName']
        ? adminRegisterForm.firstName.value
        : '',
      lastName: adminRegisterForm['lastName']
        ? adminRegisterForm.lastName.value
        : '',
      phone: adminRegisterForm['phone'] ? adminRegisterForm.phone.value : '',
      email: adminRegisterForm['email'] ? adminRegisterForm.email.value : '',
      password: adminRegisterForm['password']
        ? adminRegisterForm.password.value
        : '',
      passwordConfirm: adminRegisterForm['passwordConfirm']
        ? adminRegisterForm.passwordConfirm.value
        : '',
    };
    return adminRegisterStart(registerData);
  };
  render() {
    const { adminRegisterForm, redirect, message, loading } = this.props;
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
            formSubmit={this.adminRegisterSubmitHandler}
            inputChange={this.adminRegisterInputChange}
            adminRegisterForm={adminRegisterForm}
          />
          <Message message={message} />
        </SlideIn>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    adminRegisterForm: state.register.adminRegisterForm,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
  };
};
export default connect(
  mapStateToProps,
  { adminSetFieldsMid, adminRegisterStart },
)(MainPage);
