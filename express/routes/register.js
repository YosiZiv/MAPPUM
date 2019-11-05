const express = require('express');

const router = express.Router();
const {
  registerAdmin,
  registerUser,
  emailConfirm,
} = require('../handlers/register');
const { adminCheckToken } = require('../middlewares/admin');
router.get('/confirmed/:token', emailConfirm);
router.post('/registeradmin', registerAdmin);
router.post('/registeruser', adminCheckToken, registerUser);
module.exports = router;
