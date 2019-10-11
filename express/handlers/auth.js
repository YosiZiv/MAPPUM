const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET, TOKEN_EXPIRES_IN, ADMIN } = require('../../config/keys');
const { validateLoginInput } = require('../validation/auth');
//  Load user model
const { User } = require('../models');

//  Login User Handle function

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  const errors = validateLoginInput(req.body);
  if (Object.keys(errors).length) {
    console.log(errors);

    return res.status(400).json({ errors });
  }
  //  Find user by email
  return User.findOne({ email }).then(dbUser => {
    // Check for User
    if (!dbUser) {
      errors.global = 'email or password incorrect';
      return res.status(400).json({ errors });
    }
    return bcrypt
      .compare(password, dbUser.password)
      .then(isMatch => {
        console.log(isMatch);
        if (!isMatch) {
          errors.global = 'email or password incorrect';
          return res.status(400).json({ errors });
        }
        if (isMatch) {
          //  User Matchedr
          if (dbUser.role === 'admin') {
            const user = {
              id: dbUser.id,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              email: dbUser.email,
              admin: true,
            };
            return jwt.sign(
              user,
              ADMIN,
              { expiresIn: TOKEN_EXPIRES_IN },
              (err, token) => {
                return res.json({
                  adminToken: `Bearer ${token}`,
                  expiresIn: TOKEN_EXPIRES_IN,
                });
              },
            );
          }
          const user = {
            id: dbUser.id,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            email: dbUser.email,
          };
          //  Sign Token
          return jwt.sign(
            user,
            SECRET,
            { expiresIn: TOKEN_EXPIRES_IN },
            (err, token) =>
              res.json({
                userToken: `Bearer ${token}`,
                expiresIn: TOKEN_EXPIRES_IN,
              }),
          );
        }
        errors.global = 'email or password incorrect';
        return res.status(400).json({ errors });
      })
      .catch(err => {
        console.log(err);
        errors.global = 'Something went wrong :/';
        return res.status(400).json({ errors });
      });
  });
};
