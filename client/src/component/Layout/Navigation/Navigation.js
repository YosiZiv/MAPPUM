import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigation.css';
const navigation = props => {
  const { admin, user } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink activeClassName="NavLogo" to="/" className="navbar-brand">
        MPPUM
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              exact
              activeClassName="NavSelect"
              to="/"
              className="navLink"
            >
              Home{' '}
            </NavLink>
          </li>
          {!admin && !user ? (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/login"
                className="navLink"
              >
                Login
              </NavLink>
            </li>
          ) : null}
          {admin ? (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/dashboard"
                className="navLink"
              >
                Admin Area
              </NavLink>
            </li>
          ) : null}
          {user ? (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/userarea"
                className="navLink"
              >
                User Area
              </NavLink>
            </li>
          ) : null}
          {user || admin ? (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/logout"
                className="navLink"
              >
                Logout
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(navigation);
