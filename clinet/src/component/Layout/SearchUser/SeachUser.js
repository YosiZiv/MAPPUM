import React from 'react';

const searchUser = props => (
  <>
    <div className="form-group"></div>
    <h2 className="formRegisterTitle">Seach User</h2>
    <form className="Registerform">
      {props.form}
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
        Search
        <i
          style={{ fontSize: '18px', paddingLeft: '1vw' }}
          className="fas fa-chevron-circle-right"
        ></i>
      </button>
    </form>
  </>
);
export default searchUser;
