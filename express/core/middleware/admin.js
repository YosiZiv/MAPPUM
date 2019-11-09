const jwt = require('jsonwebtoken');
const { ADMIN } = require('../../../config/keys');

module.exports.adminCheckToken = function(req, res, next) {
  var bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);

  const errors = {};
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split('Bearer ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, ADMIN, (err, result) => {
      if (err) {
        errors.global = 'UNAUTHORIZED';
        return res.status(403).json({ errors });
      } else {
        return next();
      }
    });
  }
  errors.global = 'UNAUTHORIZED';
  return res.status(403).json({ errors });
};
