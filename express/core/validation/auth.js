const Validator = require('validator');

exports.validateLoginInput = data => {
  const errors = {};

  const { email = '', password = '' } = data;
  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  //  password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }
  return errors;
};

exports.validateCustomerInput = data => {
  const errors = {};
  const {
    firstName = '',
    lastName = '',
    phone = '',
    address = '',
    email = '',
  } = data;
  //  first name validations
  if (!Validator.isLength(firstName, { min: 2, max: 256 })) {
    errors.firstName = 'first name must be between 2 - 256 char ';
  }
  if (Validator.isEmpty(firstName)) {
    errors.firstName = 'first name must be fill';
  }
  //  last_name validation
  if (!Validator.isLength(lastName, { min: 2, max: 256 })) {
    errors.lastName = 'last name must be between 2 - 256 char ';
  }
  if (Validator.isEmpty(lastName)) {
    errors.lastName = 'last name must be fill';
  }
  if (!Validator.isLength(phone, { min: 6, max: 256 })) {
    errors.phone = 'phone must be between 6 - 256 char only';
  }
  if (Validator.isEmpty(phone)) {
    errors.phone = 'phone must be fill';
  }

  if (!Validator.isLength(address, { min: 2, max: 256 })) {
    errors.address = 'address must be between 2 - 256 char only';
  }
  if (Validator.isEmpty(address)) {
    errors.address = 'address must be fill';
  }

  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'email must be fill';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'email format incorrect';
  }
  return errors;
};
exports.validateAdminRegisterInput = data => {
  const errors = {};
  const {
    firstName = '',
    lastName = '',
    phone = '',
    email = '',
    password = '',
    passwordConfirm = '',
  } = data;
  //  first name validations
  if (!Validator.isLength(firstName, { min: 2, max: 256 })) {
    errors.firstName = 'first name must be between 2 - 256 char ';
  }
  if (Validator.isEmpty(firstName)) {
    errors.firstName = 'first name must be fill';
  }
  //  last_name validation
  if (!Validator.isLength(lastName, { min: 2, max: 256 })) {
    errors.lastName = 'last name must be between 2 - 256 char ';
  }
  if (Validator.isEmpty(lastName)) {
    errors.lastName = 'last name must be fill';
  }

  if (!Validator.isLength(phone, { min: 6, max: 256 })) {
    errors.phone = 'phone must be between 6 - 256 char only';
  }
  if (Validator.isEmpty(phone)) {
    errors.phone = 'phone must be fill';
  }

  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'email must be fill';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'email format incorrect';
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'password didnt match';
  }
  if (!Validator.isLength(password, { min: 6, max: 256 })) {
    errors.password = 'password length must be between';
  }
  return errors;
};
