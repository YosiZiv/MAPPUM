import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';
import MainPageImg from '../../../assets/images/MainPageImage.jpg';
class MainPage extends Component {
  state = {};

  render() {
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
          <NavLink to="/login">
            <button className="btn btn-primary" type="button">
              Click To Start
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}
export default MainPage;
