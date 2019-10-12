/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../../../Layout/TextInput/TextInput';
import {
  createProductStart,
  setProductFields,
} from '../../../../../redux/actions/sell';
import './createItem.css';

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
    const { name, description, sellPrice } = productForm;
    return (
      <div className="createItemPage">
        {redirect && <Redirect to={redirect} />}
        <h2 className="formTitle">New Product</h2>
        <form className="createItemForm" onSubmit={this.submitHandler}>
          <Input
            isValid={name ? name.isValid : true}
            className="form-control"
            id="name"
            name="name"
            type="text"
            error={message && message.name}
            required
            disabled={loading}
            defaultValue={name && name.value}
            inputChange={this.handleInputChange}
            validation={{
              isRequired: true,
              minLength: 2,
              maxLength: 256,
            }}
          />
          <Input
            isValid={description ? description.isValid : true}
            className="form-control"
            id="description"
            name="description"
            type="text"
            error={message && message.description}
            required
            disabled={loading}
            defaultValue={description && description.value}
            inputChange={this.handleInputChange}
            validation={{
              isRequired: true,
              minLength: 2,
              maxLength: 256,
            }}
          />
          <Input
            isValid={sellPrice ? sellPrice.isValid : true}
            className="form-control"
            id="sellPrice"
            name="sellPrice"
            type="text"
            error={message && message.sellPrice}
            required
            disabled={loading}
            defaultValue={sellPrice && sellPrice.value}
            inputChange={this.handleInputChange}
            validation={{
              isRequired: true,
              isNumeric: true,
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: '50%',
              fontSize: '15px',
              marginTop: '15px',
              alignSelf: 'center',
              justifySelf: 'center',
              float: 'left',
            }}
            onClick={this.submitHandler}
          >
            next Page{' '}
            <i
              style={{ fontSize: '18px', marginRight: '2px' }}
              className="fas fa-chevron-circle-right"
            ></i>
          </button>
          {message
            ? message.global && (
                <div className="globalError">
                  <p>* {message.global.toUpperCase()}</p>
                </div>
              )
            : null}
        </form>
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
