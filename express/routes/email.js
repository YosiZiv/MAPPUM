const express = require('express');

const router = express.Router();
//  middleware
const asyncMiddleware = require('../core/middleware/async');
const { adminCheckToken } = require('../core/middleware/admin');

const { sendPasswordToMail } = require('../handlers/email');

router.post(
  '/sendpasswordtoemail',
  adminCheckToken,
  asyncMiddleware(sendPasswordToMail),
);
// router.post('/')
module.exports = router;
