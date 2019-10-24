/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateProduct from '../../../../Layout/CreateProduct/CreateProduct';
import {
  createProductStart,
  setProductFields,
} from '../../../../../redux/actions/sell';
import './CreateProduct.css';

class createItem extends Component {
  handleInputChange = ({ id, value, validation }) => {
    const { setProductFields } = this.props;
    setProductFields({ id, value, validation });
  };
  submitHandler = async event => {
    const { createProductStart, productForm } = this.props;
    const productData = {
      name: productForm.name.value,
      description: productForm.description.value,
      sellPrice: productForm.sellPrice.value,
    };
    return createProductStart(productData);
  };
  render() {
    const { redirect, message, productForm, loading } = this.props;
    return (
      <div className="createProductPage">
        <CreateProduct
          message={message}
          productForm={productForm}
          loading={loading}
          inputChange={this.handleInputChange}
          submit={this.submitHandler}
        />
        {redirect && <Redirect to={redirect} />}

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
const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    productForm: state.sell.productForm,
  };
};
export default connect(
  mapStateToProps,
  { setProductFields, createProductStart },
)(createItem);
