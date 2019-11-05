const express = require('express');

const router = express.Router();
//  middleware
const asyncMiddleware = require('../middlewares/async');
const { adminCheckToken } = require('../middlewares/admin');

const { sendPasswordToMail } = require('../handlers/email');

router.post(
  'sendpasswordtoemail',
  adminCheckToken,
  asyncMiddleware(sendPasswordToMail),
);
// router.post('/')
module.exports = router;
