import React, { Component } from 'react';
import './FormConfirm.css';
import { connect } from 'react-redux';
import FormConfirm from '../../../../Layout/FormConfirm/FormConfirm';
import Spinner from '../../../../Layout/Spinners/Spinners';
import { formSubmitStart } from '../../../../../redux/actions/sell';
import { Redirect } from 'react-router-dom';
class FormConfirmPage extends Component {
  submitHandler = () => {
    const { product, user, formSubmitStart } = this.props;
    const formData = {
      userId: user._id,
      productId: product._id,
    };
    return formSubmitStart(formData);
  };
  render() {
    const { product, user, loading, redirect } = this.props;
    console.log(product, user);

    return (
      <div className="formConfirmPage">
        {redirect && <Redirect to={redirect} />}

        {loading ? (
          <Spinner />
        ) : user && product ? (
          <FormConfirm
            submit={this.submitHandler}
            product={product}
            user={user}
          />
        ) : (
          <p>user or product didnt found please create new sell</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  admin: state.auth.admin,
  product: state.sell.product,
  user: state.register.user,
  message: state.ui.message,
  loading: state.ui.loading,
  redirect: state.ui.redirect,
});
export default connect(
  mapStateToProps,
  { formSubmitStart },
)(FormConfirmPage);
