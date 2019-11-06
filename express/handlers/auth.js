const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET, TOKEN_EXPIRES_IN, ADMIN } = require('../../config/keys');
const { validateLoginInput } = require('../core/validation/auth');
//  Load user model
const { User } = require('../models');

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

//  Legacy
// //  Login User Handle function
// exports.loginLegacy = async (req, res, next) => {
//   const { email, password } = req.body;
//   const errors = validateLoginInput(req.body);
//   if (Object.keys(errors).length) {
//     return res.status(400).json({ errors });
//   }
//   const user = await checkEmail(email);
//   if (!user) {
//     errors.global = 'email or password incorrect';
//     return res.status(400).json({ errors });
//   }
//   if (!user.confirmed) {
//     errors.global = 'please confirm your email first';
//     return res.status(403).json({ errors });
//   }
//   bcrypt
//     .compare(password, user.password)
//     .then(isMatch => {
//       if (!isMatch) {
//         errors.global = 'email or password incorrect';
//         return res.status(400).json({ errors });
//       }
//       if (isMatch) {
//         const userData = {
//           id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           role: user.role,
//         };
//         const secret = user.role === 'admin' ? ADMIN : SECRET;
//         const key = user.role === 'admin' ? 'adminToken' : 'userToken';
//         return jwt.sign(
//           userData,
//           secret,
//           { expiresIn: TOKEN_EXPIRES_IN },
//           (err, token) => {
//             return res.json({
//               key,
//               token: `Bearer ${token}`,
//               expiresIn: TOKEN_EXPIRES_IN,
//               id: userData.id,
//             });
//           },
//         );
//       }
//       errors.global = 'email or password incorrect';
//       return res.status(400).json({ errors });
//     })
//     .catch(err => {
//       errors.global = 'Something went wrong :/';
//       return res.status(400).json({ errors });
//     });
// };
exports.emailConfirm = async (req, res, next) => {
  try {
    const { token } = req.params;
    const {
      user: { id },
    } = jwt.verify(req.params.token, EMAIL);
    await User.updateOne({ confirmed: true }).where({ id });
  } catch (err) {}
};
