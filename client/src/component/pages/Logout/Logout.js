import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth';
class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { redirectPath } = this.props;
    return <Redirect to={redirectPath} />;
  }
}
const mapStateToProps = state => {
  return {
    redirectPath: state.ui.redirect,
  };
};
export default connect(
  mapStateToProps,
  { logout },
)(Logout);
