/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchCustomer from '../../../../Layout/SearchUser/SearchUser';
import RegisterCustomer from '../../../../Layout/RegisterCustomer/RegisterCustomer';
import './CustomerCreate.css';
import {
  getUserCustomers,
  customerRegisterStart,
  inputHandle,
} from '../../../../../redux/actions/customer';
import { changeSellStage } from '../../../../../redux/actions/sell';

class CustomerCreate extends Component {
  componentDidMount() {
    const { getUserCustomers } = this.props;
    getUserCustomers();
  }

  switchMode = () => {
    const { switchRegisterMode } = this.props;
    switchRegisterMode();
  };
  customerInputChange = ({ id, value, validation }) => {
    const { inputHandle } = this.props;
    inputHandle({ id, value, validation });
  };
  searchInputChange = ({ id, value, validation }) => {
    const { setSearchFields, searchUserAutoComplete } = this.props;
    setSearchFields({ id, value, validation });
    searchUserAutoComplete(value);
  };
  registerSubmitHandler = async event => {
    const { customerRegisterStart, customerForm } = this.props;
    const id = localStorage.getItem('id');
    const customerData = {
      admin: id,
      firstName: customerForm['firstName'] ? customerForm.firstName.value : '',
      lastName: customerForm['lastName'] ? customerForm.lastName.value : '',
      phone: customerForm['phone'] ? customerForm.phone.value : '',
      address: customerForm['address'] ? customerForm.address.value : '',
      email: customerForm['email'] ? customerForm.email.value : '',
    };

    return customerRegisterStart(customerData, id);
  };
  userSelect = email => {
    const { getUserByEmail } = this.props;
    const data = {
      email,
    };
    getUserByEmail(data);
  };
  render() {
    const {
      user,
      registerForm,
      searchForm,
      autoCompleteResult,
      redirect,
      message,
      mode,
      loading,
    } = this.props;
    return (
      <div className="registerPage">
        {redirect && <Redirect to={redirect} />}
        <div className="modeContainer">
          <p>
            Switch to{' '}
            <label onClick={this.switchMode}>
              {mode ? 'Search User' : 'Register New'}
            </label>
          </p>
        </div>
        {mode ? (
          <RegisterCustomer
            loading={loading}
            message={message}
            formSubmit={this.registerSubmitHandler}
            inputChange={this.registerInputChange}
            registerUserForm={registerForm}
          />
        ) : (
          <SearchCustomer
            changeSellStage={changeSellStage}
            inputChange={this.searchInputChange}
            user={user}
            userSelect={this.userSelect}
            searchForm={searchForm}
            autoCompleteResult={autoCompleteResult}
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
CustomerCreate.prop = {
  customerForm: PropTypes.object,
  loading: PropTypes.bool,
  message: PropTypes.string,
  customer: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    customerForm: state.customer.customerForm,
    customer: state.customer.customer,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
  };
};

export default connect(
  mapStateToProps,
  { getUserCustomers, customerRegisterStart, inputHandle },
)(CustomerCreate);
