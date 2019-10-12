import React from 'react';
import { NavLink } from 'react-router-dom';
const searchUser = props => (
  <div className="form-group">
    <h2 className="formRegisterTitle">Search User</h2>
    <form className="Registerform">
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
      {props.user ? (
        <div>
          <p>
            last user{' '}
            <NavLink to="sell/createitem">{props.user.firstName}</NavLink> found
          </p>
          <NavLink to="sell/createitem">
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: '1.5vw',
                marginBottom: '15px',
                alignSelf: 'end',
                justifySelf: 'end',
                gridColumn: 2,
              }}
              onClick={props.submit}
            >
              continue with {props.user.firstName}
              <i
                style={{ fontSize: '18px', paddingLeft: '1vw' }}
                className="fas fa-chevron-circle-right"
              ></i>
            </button>
          </NavLink>
        </div>
      ) : null}
    </form>
  </div>
);
export default searchUser;
