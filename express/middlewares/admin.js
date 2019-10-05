const jwt = require('jsonwebtoken');
const { ADMIN } = require('../../config/keys');

module.exports.adminCheckToken = function(req, res, next) {
  var bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split('Bearer ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, ADMIN, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'UNAUTHORIZE' });
      } else {
        return next();
      }
    });
  }
};
