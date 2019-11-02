import React from 'react';
import Input from '../TextInput/TextInput';
import './SearchUser.css';
import AutoComplate from '../AutoComplate/AutoComplate';
const searchUser = props => {
  const {
    loading,
    searchForm,
    message,
    userSelect,
    inputChange,
    autoComplateResult,
  } = props;
  const { email = '' } = searchForm;
  return (
    <div className="searchUserContainer">
      <div className="searchUserTitle">
        <h2>Search User</h2>
      </div>
      <form className="searchUserForm">
        <Input
          isValid={email ? email.isValid : true}
          className="form-control"
          id="email"
          name="Email"
          type="email"
          error={message && message.email}
          required
          disabled={loading}
          defaultValue={email && email.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
          }}
        />

        {email['value'] ? (
          <div className="resultContainer">
            <AutoComplate
              searchForm={searchForm}
              autoComplateResult={autoComplateResult}
              userSelect={userSelect}
            />
          </div>
        ) : null}
      </form>
      <button type="button" className="btn btn-success searchButton">
        Search
      </button>
    </div>
  );
};

export default searchUser;
