import React from 'react';
import { connect } from 'react-redux';
const formConfirm = props => (
  <div>
    <h1>Thanks Order Complete</h1>
    <button
      className="btn btn-success"
      onClick={() => props.history.push('/dashboard')}
    >
      Finish
    </button>
  </div>
);

const mapStateToProps = state => {
  return {
    user: state.register.user,
    product: state.sell.product,
  };
};
export default connect(
  mapStateToProps,
  null,
)(formConfirm);
