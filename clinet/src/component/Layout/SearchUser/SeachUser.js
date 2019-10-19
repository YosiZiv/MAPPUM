import React from 'react';
import Input from '../TextInput/TextInput';
import './SearchUser.css';
import AutoComplate from '../AutoComplate/AutoComplate';
const searchUser = props => {
  const {
    loading,
    searchForm,
    message,
    formSubmit,
    inputChange,
    autoComplateResult,
  } = props;
  const { email = '' } = searchForm;
  const testFunction = () => {
    const { changeSellStage } = props;
    console.log('i have neeb click ', changeSellStage);

    changeSellStage('createItem');
  };
  return (
    <div className="form-group">
      <h2 className="searchUserTitle">Search User</h2>
      <form className="searchUserForm">
        <Input
          isValid={email ? email.isValid : true}
          className="form-control"
          id="email"
          name="email"
          type="email"
          error={message && message.email}
          required
          disabled={loading}
          defaultValue={email && email.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
            isEmail: true,
          }}
        />
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
          onClick={formSubmit}
        >
          Search
          <i
            style={{ fontSize: '18px', paddingLeft: '1vw' }}
            className="fas fa-chevron-circle-right"
          ></i>
        </button>
      </form>
      <AutoComplate autoComplateResult={autoComplateResult} />
      {props.user ? (
        <div className="searchUserLastUser">
          <div>
            <h4>OR</h4>
          </div>
          <p>
            Use Last User
            <label onClick={testFunction}>{props.user.firstName}</label>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default searchUser;
