import React from 'react';
import Input from '../TextInput/TextInput';
import './RegisterUser.css';
const registerUser = props => {
  const { loading, registerUserForm, message, formSubmit, inputChange } = props;
  const {
    firstName = '',
    lastName = '',
    zahot = '',
    phone = '',
    address = '',
    email = '',
  } = registerUserForm;

  return (
    <div className="newUserContainer">
      <div className="newUserTitle">
        <h2>REGISTER</h2>
      </div>
      <form className="registerForm" onSubmit={e => e.preventDefault()}>
        <Input
          isValid={firstName ? firstName.isValid : true}
          className="form-control"
          id="firstName"
          name="firstName"
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
          name="lastName"
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
          isValid={zahot ? zahot.isValid : true}
          className="form-control"
          id="zahot"
          name="zahot"
          type="text"
          error={message && message.zahot}
          required
          disabled={loading}
          defaultValue={zahot && zahot.value}
          inputChange={inputChange}
          validation={{ isRequired: true }}
        />

        <Input
          isValid={phone ? phone.isValid : true}
          className="form-control"
          id="phone"
          name="phone"
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
          isValid={address ? address.isValid : true}
          className="form-control"
          id="address"
          name="address"
          type="text"
          error={message && message.address}
          required
          disabled={loading}
          defaultValue={address && address.value}
          inputChange={inputChange}
          validation={{
            isRequired: true,
            minLength: 2,
            maxLength: 256,
          }}
        />

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
          validation={{ isRequired: true, isEmail: true }}
        />
      </form>
      <div className="registerSubmit">
        <button className="btn btn-primary" onClick={formSubmit}>
          NEXT
        </button>
      </div>
    </div>
  );
};
export default registerUser;
