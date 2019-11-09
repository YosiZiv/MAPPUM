import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
const navigation = props => {
  const { isAuth } = props;

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
          {!isAuth && (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/login"
                className="navLink"
              >
                Login
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/dashboard"
                className="navLink"
              >
                Admin Area
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink
                activeClassName="NavSelect"
                to="/logout"
                className="navLink"
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default navigation;
