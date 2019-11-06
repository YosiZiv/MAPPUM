//  Register User Handle function
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Customer } = require('../models');
const { EMAIL } = require('../../config/keys');
const { sendPasswordToMail, sendEmailVerificationToEmail } = require('./email');
const {
  validateCustomerInput,
  validateAdminRegisterInput,
} = require('../core/validation/auth');

exports.createUser = async (req, res, next) => {
  const errors = validateAdminRegisterInput(req.body);
  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const { body } = req;

  //  Create new admin
  const newUser = await new User({ ...body });

  const { _id, firstName, lastName, email } = newUser;
  newUser.token = jwt.sign({ _id, firstName, lastName, email }, EMAIL, {
    expiresIn: '7d',
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (e, hash) => {
      if (e) {
        errors.bcrypt = 'something went wrong :/';
        return res.status(400).json({ errors });
      }
      newUser.password = hash;
      newUser
        .save()
        .then(async createdUser => {
          const { token } = createdUser;
          console.log(createdUser);

          await sendEmailVerificationToEmail(createdUser);
          return res.status(200).json({ msg: 'User created' });
        })
        .catch(err => {
          if (err.code === 11000) {
            errors.global = 'Email already exists';
            return res.status(400).json({ errors });
          }
          if (err) {
            errors.global = 'something went wrong :/';
            return res.status(500).json(err);
          }
        });
    });
  });
};
exports.createCustomer = async (req, res, next) => {
  const errors = validateCustomerInput(req.body);
  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const { body } = req;

  //  Create new admin
  const customer = await new Customer({ ...body });

  customer
    .save()
    .then(async createdCustomer => {
      return res.status(200).json({ msg: 'Customer created', createCustomer });
    })
    .catch(err => {
      if (err.code === 11000) {
        errors.global = 'Email already exists';
        return res.status(400).json({ errors });
      }
      if (err) {
        errors.global = 'something went wrong :/';
        return res.status(500).json(err);
      }
    });
};
exports.getUserCustomers = async (req, res, next) => {
  const errors = {};
  try {
    const { customers } = req.body;

    const emails = [];
    const getCustomers = await Customer.find({
      _id: { $in: customers },
    }).select('email');
    customers.forEach(customer => {
      emails.push(user['email']);
    });
    res.status(200).json({ emails });
  } catch (err) {
    errors.global = 'Something went wrong :/';
    return res.status(400).json({ errors });
  }
};
