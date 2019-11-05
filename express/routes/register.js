const express = require('express');

const router = express.Router();
const { registerAdmin, registerUser } = require('../handlers/register');
const { adminCheckToken } = require('../middlewares/admin');

router.post('/registeradmin', registerAdmin);
router.post('/registeruser', adminCheckToken, registerUser);
module.exports = router;
