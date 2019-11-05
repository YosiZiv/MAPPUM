const express = require('express');
let upload = require('../../config/multer');
const router = express.Router();
const { fileUploade } = require('../handlers/file');

//  middleware
const asyncMiddleware = require('../middlewares/async');
const { adminCheckToken } = require('../middlewares/admin');

router.post(
  '/uploadfile',
  adminCheckToken,
  upload.array('file'),
  asyncMiddleware(fileUploade),
);
module.exports = router;
