const { Customer } = require('../models');
exports.createCustomer = async (req, res, next) => {
  const errors = validateRegisterInput(req.body); //TODO ADD CUSTOMER REGISTER VALIDATION
  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const { firstName, lastName, phone, address, email, admin } = req.body;
  //  Check if email already exists
  let customer = await Customer.findOne({ email });
  if (customer) {
    errors.global = 'email already exists';
    return res.status(400).json({ errors });
  }

  customer = await new Customer({
    firstName,
    lastName,
    phone,
    address,
    email,
  });
  customer
    .save()
    .then(result => {
      if (!result) {
        errors.global = 'something went wrong :/';
        return res.status(400).json({ errors });
      }
      return res.status(201).json({ customer, message: 'משתמש נרשם בהצלחה' });
    })
    .catch(err => {
      errors.global = 'something went wrong :/';
      return res.status(500).json({ errors });
    });
};

exports.getCustomerByEmail = (req, res, next) => {
  const { email } = req.body;

  const errors = {};
  // const errors = validateLoginInput(req.body);
  // if (Object.keys(errors).length) {
  //   return res.status(400).json({ errors });
  // }
  //  Find user by email
  Customer.findOne({ email })
    .then(customer => {
      // Check for User
      if (!customer) {
        errors.global = 'customer didnt found please sign new customer';
        return res.status(400).json({ errors });
      }
      return res.status(200).json({ customer });
    })
    .catch(err => {
      errors.global = 'Something went wrong :/';
      return res.status(400).json({ errors });
    });
};

