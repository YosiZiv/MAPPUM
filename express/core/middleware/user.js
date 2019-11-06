const jwt = require('jsonwebtoken');
const { SECRET } = require('../../../config/keys');

module.exports.userCheckToken = function(req, res, next) {
  const errors = {};
  var bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split('Bearer ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, SECRET, (err, result) => {
      if (err) {
        errors.global = 'UNAUTHORIZED';
        return res.status(403).json({ errors });
      } else {
        return next();
      }
    });
  }
};
