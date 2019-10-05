import React from 'react';

const signUser = props => (
  <div className="form-group">
    <h2 className="formRegisterTitle">Sign User</h2>

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
        Next
        <i
          style={{ fontSize: '18px', paddingLeft: '1vw' }}
          className="fas fa-chevron-circle-right"
        ></i>
      </button>
    </form>
  </div>
);
export default signUser;
