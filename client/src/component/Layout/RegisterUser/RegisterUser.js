import React from 'react';
import Input from '../TextInput/TextInput';
import './RegisterUser.css';
const registerAdmin = props => {
  const {
    loading,
    registerForm,
    message,
    formSubmit,
    inputChange,
    closeForm,
  } = props;
  const {
    firstName = '',
    lastName = '',
    phone = '',
    email = '',
    password = '',
    passwordConfirm = '',
  } = registerForm;

  return (
    <div className="registerAdminContainer">
      <div className="adminTitle">
        <h2> BE ADMIN</h2>
        <i
          onClick={closeForm}
          style={{ fontSize: '2vw', cursor: 'pointer' }}
          className="fas fa-times"
        ></i>
      </div>
      <form className="adminRegisterForm" onSubmit={e => e.preventDefault()}>
        <Input
          isValid={firstName ? firstName.isValid : true}
          className="form-control"
          id="firstName"
          name="FIRST NAME"
          type="text"
          error={message && message.firstName}
          required
          disabled={loading}
          defaultValue={firstName && firstName.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
            minLength: 2,
            maxLength: 256,
          }}
        />
        <Input
          isValid={lastName ? lastName.isValid : true}
          className="form-control"
          id="lastName"
          name="LAST NAME"
          type="text"
          error={message && message.lastName}
          required
          disabled={loading}
          defaultValue={lastName && lastName.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
            minLength: 2,
            maxLength: 256,
          }}
        />

        <Input
          isValid={phone ? phone.isValid : true}
          className="form-control"
          id="phone"
          name="PHONE"
          type="text"
          error={message && message.phone}
          required
          disabled={loading}
          defaultValue={phone && phone.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
            minLength: 6,
            maxLength: 256,
          }}
        />
        <Input
          isValid={email ? email.isValid : true}
          className="form-control"
          id="email"
          name="EMAIL"
          type="email"
          error={message && message.email}
          required
          disabled={loading}
          defaultValue={email && email.value}
          inputChange={inputChange}
          validation={{ isRequired: true, isEmail: true }}
        />

        <Input
          isValid={password ? password.isValid : true}
          className="form-control"
          id="password"
          name="PASSWORD"
          type="password"
          error={message && message.password}
          required
          disabled={loading}
          defaultValue={password && password.value}
          inputChange={inputChange}
          validation={{ isRequired: true, minLength: 6 }}
        />
        <Input
          isValid={password ? password.isValid : true}
          className="form-control"
          id="passwordConfirm"
          name="RE PASSWORD"
          type="password"
          error={message && message.passwordConfirm}
          required
          disabled={loading}
          defaultValue={passwordConfirm && passwordConfirm.value}
          inputChange={inputChange}
          validation={{ isRequired: true, minLength: 6 }}
        />
        <div className="registerSubmit">
          <button className="btn btn-primary" onClick={formSubmit}>
            BE ADMIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default registerAdmin;
