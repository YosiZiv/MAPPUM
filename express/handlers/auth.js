const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET, TOKEN_EXPIRES_IN, ADMIN } = require('../../config/keys');
const { validateLoginInput } = require('../core/validation/auth');
//  Load user model
const { User, Customer } = require('../models');

//  Login
exports.login = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  const errors = validateLoginInput(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }
  const user = await User.findOne({ email });
  //  check for user
  if (!user) {
    errors.global = 'email or password incorrect';
    return res.status(400).json({ errors });
  }
  if (!user.confirmed) {
    errors.global = 'please confirm your email first';
    return res.status(403).json({ errors });
  }
  bcrypt
    .compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) {
        errors.global = 'email or password incorrect';
        return res.status(400).json({ errors });
      }
      if (isMatch) {
        const userData = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        return jwt.sign(
          userData,
          ADMIN,
          { expiresIn: TOKEN_EXPIRES_IN },
          (err, token) => {
            return res.json({
              token: `Bearer ${token}`,
            });
          },
        );
      }
      errors.global = 'email or password incorrect';
      return res.status(400).json({ errors });
    })
    .catch(err => {
      errors.global = 'Something went wrong :/';
      return res.status(400).json({ errors, err });
    });
};

exports.emailConfirm = async (req, res, next) => {
  const errors = {};
  const { token } = req.params;
  console.log(token);

  Customer.findOneAndUpdate(
    { token },
    {
      $set: { confirmed: true },
    },
    (err, confirmedEmail) => {
      if (err) {
        console.log('error', err);

        errors.global = 'Error while confirming user email';
        return err;
      }
      console.log(confirmedEmail);

      return confirmedEmail;
    },
  )
    .then(userConfirmed => {
      console.log(userConfirmed);
      if (!userConfirmed) {
        errors.global =
          'The verification Email has been expired, to resend an email';
        return res.status(400).json({ errors });
      }
      console.log(userConfirmed, 'right before returns');

      return res.status(201).json({ msg: 'email confirmed success' });
    })
    .catch(err => {
      console.log(err);

      errors.global = 'Something went wrong while confirming user';
      return res.status(400).json({ errors, err });
    });
};
