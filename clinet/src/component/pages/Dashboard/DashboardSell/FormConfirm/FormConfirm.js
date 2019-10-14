import React, { Component } from 'react';
import './FormConfirm.css';
import { connect } from 'react-redux';
import Spinner from '../../../../Layout/Spinners/Spinners';
import { formSubmitStart } from '../../../../../redux/actions/sell';
class FormConfirm extends Component {
  submitHandler = () => {
    const { product, user, formSubmitStart } = this.props;
    const formData = {
      userId: user._id,
      productId: product._id,
    };
    return formSubmitStart(formData);
  };
  render() {
    const { product, user, loading } = this.props;
    console.log(product, user);

    return (
      <div className="formConfirmContainer">
        {/* {redirect ? <Redirect to="/dashboard/sell/formsuccess" /> : null} */}

        {loading ? (
          <Spinner />
        ) : user && product ? (
          <React.Fragment>
            <div className="formConfirmTitle">
              <h1>Sale Summary</h1>
            </div>
            <div className="formConfirmFlex">
              <div className="userDetailes">
                <div className="formConfirmSubtitle">
                  <h6>Customars Summary</h6>
                </div>

                <div className="formConfirmWrapper">
                  <label>First Name:</label>
                  <label>{user.firstName}</label>
                </div>

                <div className="formConfirmWrapper">
                  <label>Last Name</label>
                  <label>{user.lastName}</label>
                </div>

                <div className="formConfirmWrapper">
                  <label>Id Number</label>
                  <label>{user.zahot}</label>
                </div>

                <div className="formConfirmWrapper">
                  <label>Phone Number</label>
                  <label>{user.phone}</label>
                </div>
              </div>
              <div className="userDetailes">
                <div className="formConfirmSubtitle">
                  <h6>Product Summary</h6>
                </div>

                <div className="formConfirmWrapper">
                  <label>Product Name</label>
                  <label>{product.name}</label>
                </div>

                <div className="formConfirmWrapper">
                  <label>Product Description</label>
                  <label>{product.description}</label>
                </div>
              </div>
            </div>
            <button className="btn btn-success" onClick={this.submitHandler}>
              Submit
            </button>
          </React.Fragment>
        ) : (
          <p>user or product didnt found please create new sell</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  product: state.sell.product,
  user: state.register.user,
  message: state.ui.message,
  loading: state.ui.loading,
  admin: state.auth.admin,
});
export default connect(
  mapStateToProps,
  { formSubmitStart },
)(FormConfirm);
