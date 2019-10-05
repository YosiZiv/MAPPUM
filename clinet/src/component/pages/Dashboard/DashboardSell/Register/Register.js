/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchUser from '../../../../Layout/SearchUser/SeachUser';
import SignUser from '../../../../Layout/SignUser/SignUser';
import Input from '../../../../Layout/Input/Input';
import Spinner from '../../../../Layout/Spinners/Spinners';
import './Register.css';
import { updateObject, checkValidity } from '../../../../../shared/utility';
import {
  registerStart,
  searchUser,
} from '../../../../../redux/actions/register';
class Register extends Component {
  state = {
    register: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
      zahot: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Id',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
          maxLength: 9,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Adress',
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 60,
        },
        valid: false,
        touched: false,
      },
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
        valid: false,
        touched: false,
      },
    },
    searchUser: {
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
        valid: false,
        touched: false,
      },
    },
    mode: 'new',
    formIsValid: false,
    messages: null,
    redirectTo: false,
  };

  inputChangeHandler = (event, name, form, controlName) => {
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, form[controlName].validation),
        touched: true,
      }),
    });
    let formIsValid = true;
    Object.entries(updatedControls).forEach(key => {
      formIsValid = key[1].valid && formIsValid;
    });
    if (name === 'register') {
      this.setState({ register: updatedControls, formIsValid });
    }
    if (name === 'new') {
      this.setState({ searchUser: updatedControls, formIsValid });
    }
  };
  switchModeHandler = mode => {
    if (mode === 'new') {
      this.setState({ mode: 'search' });
    }
    if (mode === 'search') {
      this.setState({ mode: 'new' });
    }
  };
  submitHandler = async event => {
    const { registerStart } = this.props;
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      zahot,
    } = this.state.register;
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      zahot: zahot.value,
      phone: phone.value,
      address: address.value,
      email: email.value,
    };
    return registerStart(formData);
  };
  searchUserHander = () => {
    const { searchUser } = this.props;
    const { email } = this.state.searchUser;
    const formData = {
      email: email.value,
    };
    return searchUser(formData);
  };
  render() {
    const { register, searchUser, mode } = this.state;
    const { message, redirect, loading, user } = this.props;
    console.log(mode, mode === 'new');

    const formUserSearchArray = [];
    const formUserSignArray = [];
    Object.entries(searchUser).forEach(key => {
      formUserSearchArray.push({
        id: [key[0]],
        config: { ...key[1] },
      });
    });
    Object.entries(register).forEach(key => {
      formUserSignArray.push({
        id: [key[0]],
        config: { ...key[1] },
      });
    });
    const searchUserForm = formUserSearchArray.map(formElement => (
      <div className="form-group" key={formElement.id}>
        <label
          className="formRegisterLabel"
          htmlFor={formElement.config.elementConfig.placeholder}
        >
          {formElement.config.elementConfig.placeholder}
        </label>
        <Input
          id={formElement.config.elementConfig.placeholder}
          key={formElement.id}
          changed={event =>
            this.inputChangeHandler(
              event,
              'new',
              this.state.searchUser,
              formElement.id,
            )
          }
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      </div>
    ));
    const signUserForm = formUserSignArray.map(formElement => (
      <div className="form-group" key={formElement.id}>
        <label
          className="formRegisterLabel"
          htmlFor={formElement.config.elementConfig.placeholder}
        >
          {formElement.config.elementConfig.placeholder}
        </label>
        <Input
          id={formElement.config.elementConfig.placeholder}
          key={formElement.id}
          changed={event =>
            this.inputChangeHandler(
              event,
              'register',
              this.state.register,
              formElement.id,
            )
          }
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
      <div className="RegisterPage">
        {redirect && <Redirect to={redirect} />}
        {mode === 'new' ? (
          <SignUser submit={this.submitHandler} form={signUserForm} />
        ) : mode === 'search' ? (
          <SearchUser submit={this.searchUserHander} form={searchUserForm} />
        ) : null}
        {message && (
          <div className="loginPageMessage">
            {Object.values(message).map(msg => (
              <p>* {msg.toUpperCase()}</p>
            ))}
          </div>
        )}
        {!user && mode === 'new' ? null : (
          <button
            onClick={() => this.switchModeHandler(mode)}
            className="btn btn-success"
          >
            {mode === 'new' && user ? 'Look For Customer' : 'Sign New Customer'}
          </button>
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
const mapStateToProps = state => {
  return {
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
  };
};

export default connect(
  mapStateToProps,
  { registerStart, searchUser },
)(Register);
