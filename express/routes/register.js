const express = require('express');

const router = express.Router();
const {
  registerAdmin,
  registerUser,
  emailConfirm,
} = require('../handlers/register');
//  middleware
const { adminCheckToken } = require('../middlewares/admin');
const asyncMiddleware = require('../middlewares/async');

router.get('/confirmed/:token', asyncMiddleware(emailConfirm));
router.post('/registeradmin', asyncMiddleware(registerAdmin));
router.post('/registeruser', adminCheckToken, asyncMiddleware(registerUser));
module.exports = router;
