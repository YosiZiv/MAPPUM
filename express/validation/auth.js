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

function IsValidIsrGovId(sInputId, nCustomIdLen) {
  if (+sInputId === 0) return false;

  var defaultIdLen = 9;
  (requiredIdLen = !isNaN(+nCustomIdLen) ? +nCustomIdLen : defaultIdLen),
    (sumDigs = 0);

  //pad leading zeros if missing
  for (
    sInputId = sInputId.toString();
    sInputId.length < requiredIdLen;
    sInputId = '0' + sInputId
  );

  for (var i = 0; i < sInputId.length; i++) {
    //determine if Currend Digit should be multiply by '1' or by '2', and mult' it
    var currCalcIdDig = +sInputId[i] * (i % 2 == 0 ? 1 : 2);
    sumDigs += currCalcIdDig > 9 ? (currCalcIdDig % 10) + 1 : currCalcIdDig;
  }
  // valid ID if divided by 10 without remainder
  return sumDigs % 10 == 0;
}
exports.validateRegisterInput = data => {
  const errors = {};
  const {
    firstName = '',
    lastName = '',
    zahot = '',
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
  if (!IsValidIsrGovId(zahot, 9)) {
    errors.zahot = 'id must be valid israel id';
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
  console.log(data);
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
