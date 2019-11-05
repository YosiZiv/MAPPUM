const express = require('express');

const router = express.Router();
const { sendPasswordToMail } = require('../handlers/email');
const { adminCheckToken } = require('../middlewares/admin');

router.post('sendpasswordtoemail', adminCheckToken, sendPasswordToMail);
// router.post('/')
module.exports = router;
