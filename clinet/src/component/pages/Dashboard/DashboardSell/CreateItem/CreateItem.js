/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../../../Layout/Input/Input';
import { updateObject, checkValidity } from '../../../../../shared/utility';
import { createProductStart } from '../../../../../redux/actions/sell';
import './createItem.css';

class createItem extends Component {
  state = {
    createItem: {
      productName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Product Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 40,
        },
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Product Description',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 256,
        },
        valid: false,
        touched: false,
      },
      sellPrice: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Price',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formColor: [],
    showColorList: false,
    formIsValid: false,
    redirectTo: false,
  };

  inputChangeHandler = (event, controlName) => {
    const { createItem } = this.state;
    const updatedControls = updateObject(createItem, {
      [controlName]: updateObject(createItem[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          createItem[controlName].validation,
        ),
        touched: true,
      }),
    });
    let formIsValid = true;
    Object.entries(updatedControls).forEach(key => {
      formIsValid = key[1].valid && formIsValid;
    });

    this.setState({ createItem: updatedControls, messages: null, formIsValid });
  };

  submitHandler = async event => {
    const { createProductStart } = this.props;
    const { productName, description, sellPrice } = this.state.createItem;
    const { formColor } = this.state;
    console.log(formColor);

    const formData = {
      productName: productName.value,
      description: description.value,
      sellPrice: sellPrice.value,
    };
    createProductStart(formData);
  };

  selectClickHandler = () => {
    return this.setState({ showColorList: !this.state.showColorList });
    //  return ref.current.style.display = 'block'
  };
  render() {
    const { createItem, formColor, showColorList } = this.state;
    const { redirect, message } = this.props;
    const formElementArray = [];
    Object.entries(createItem).forEach(key => {
      formElementArray.push({
        id: [key[0]],
        config: { ...key[1] },
      });
    });
    const form = formElementArray.map(formElement => {
      return (
        <div className="form-group" key={formElement.id}>
          <label
            className="formcreateItemLabel"
            htmlFor={formElement.config.elementConfig.placeholder}
          >
            {formElement.config.elementConfig.placeholder}
          </label>
          <Input
            id={formElement.config.elementConfig.placeholder}
            key={formElement.id}
            changed={event => this.inputChangeHandler(event, formElement.id)}
            checkbox={event => this.checkboxHandler(event)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            showColorList={showColorList}
            selectClickHandler={this.selectClickHandler}
            formColor={formColor}
          />
        </div>
      );
    });

    return (
      <div className="createItemPage">
        {redirect && <Redirect to={redirect} />}
        <h2 className="formTitle">New Product</h2>
        <form className="createItemForm" onSubmit={this.submitHandler}>
          {form}
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
              className="fas fa-chevron-circle-left"
            ></i>
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
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
  };
};
export default connect(
  mapStateToProps,
  { createProductStart },
)(createItem);
