//  Register User Handle function
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Customer } = require('../models');
const { EMAIL } = require('../../config/keys');
const { sendPasswordToMail, sendEmailVerificationToEmail } = require('./email');
const {
  validateRegisterInput,
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
  const errors = validateRegisterInput(req.body);
  try {
    if (Object.keys(errors).length) {
      return res.status(403).json({ errors });
    }
    const { firstName, lastName, phone, address, email, admin } = req.body;
    //  Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      errors.global = 'email already exists';
      return res.status(400).json({ errors });
    }
    user = await User.findOne({ zahot });
    if (user) {
      errors.global = 'id already exist';
      return res.status(400).json({ errors });
    }
    // GENERETE RANDOM 6 NUMBERS FOR INIT PASSWORD
    const initPassword = Math.floor(100000 + Math.random() * 900000);

    //  Create new user
    const newUser = await new User({
      firstName,
      lastName,
      zahot,
      phone,
      address,
      email,
      password: initPassword,
    });
    //  Hash the password
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (e, hash) => {
        if (e) {
          errors.bcrypt = 'something went wrong :/';
          return res.status(400).json({ errors });
        }
        newUser.password = hash;
        await newUser.save();
        // await sendPasswordToMail(
        //   newUser.firstName,
        //   newUser.email,
        //   initPassword,
        // );
        const result = await makeAdminUserRelation(newUser._id, admin);

        if (!result) {
          errors.global = 'something went wrong :/';
          return res.status(400).json({ errors });
        }
        return res
          .status(201)
          .json({ user: newUser, message: 'משתמש נרשם בהצלחה' });
      });
    });
  } catch (err) {
    errors.global = 'something went wrong :/';
    return res.status(500).json({ errors });
  }
};
