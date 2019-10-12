const Validator = require('validator');

exports.validateProductInput = data => {
  const errors = {};
  const { name = '', description = '', sellPrice = '' } = data;
  //  first name validations
  if (!Validator.isLength(name, { min: 2, max: 256 })) {
    errors.name = 'product name must between 3- 40 char';
  }
  if (Validator.isEmpty(name)) {
    errors.name = 'product name is required';
  }
  if (!Validator.isLength(description, { min: 2, max: 256 })) {
    errors.description = 'product description must between 2- 256 char';
  }
  if (Validator.isEmpty(description)) {
    errors.description = 'product description is required';
  }
  if (!Validator.isNumeric(sellPrice)) {
    errors.sellPrice = 'price must be a valid number';
  }
  //  company name validation
  return errors;
};
