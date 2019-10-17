import React from 'react';
import { NavLink } from 'react-router-dom';
import './SearchUser.css';
const searchUser = props => (
  <div className="form-group">
    <h2 className="searchUserTitle">Search User</h2>
    <form className="searchUserForm">
      {props.form}
      <button
        type="button"
        className="btn btn-primary"
        style={{
          fontSize: '1.5vw',
          height: '50%',
          marginTop: '40px',
          justifySelf: 'start',
          gridColumn: 2,
        }}
        onClick={props.submit}
      >
        Search
        <i
          style={{ fontSize: '18px', paddingLeft: '1vw' }}
          className="fas fa-chevron-circle-right"
        ></i>
      </button>
    </form>
    {props.user ? (
      <div>
        <div>
          <h4>OR</h4>
        </div>

        <p>
          Use Last User{' '}
          <NavLink to="sell/createitem">{props.user.firstName}</NavLink>
        </p>
      </div>
    ) : null}
  </div>
);
export default searchUser;
