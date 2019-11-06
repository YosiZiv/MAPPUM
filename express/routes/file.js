const express = require('express');
let upload = require('../../config/multer');
const router = express.Router();
const { fileUpload } = require('../handlers/file');

//  middleware
const asyncMiddleware = require('../core/middleware/async');
const { adminCheckToken } = require('../core/middleware/admin');

router.post(
  '/uploadfile',
  adminCheckToken,
  upload.array('file'),
  asyncMiddleware(fileUpload),
);
module.exports = router;
