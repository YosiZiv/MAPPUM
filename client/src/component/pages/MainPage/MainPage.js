import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './MainPage.css';
import MainPageImg from '../../../assets/images/MainPageImage.jpg';
class MainPage extends Component {
  state = {};

  render() {
    const { admin, user } = this.props;
    return (
      <div
        className="MainPageBackground"
        style={{
          backgroundImage: `url(${MainPageImg})`,
        }}
      >
        <div className="MainPageContent">
          <h2> Welcome to MPPUM</h2>
          <br />
          <p>My Pivate Product User Managment </p>
          <NavLink to={admin ? '/dashboard' : user ? 'userarea' : '/login'}>
            <button className="btn btn-primary" type="button">
              Click To Start
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
    user: state.auth.user,
  };
};
export default connect(
  mapStateToProps,
  null,
)(MainPage);
