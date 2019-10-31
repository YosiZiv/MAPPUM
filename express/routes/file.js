const express = require('express');
let upload = require('../../config/multer');
const router = express.Router();
const { fileUploade } = require('../handlers/file');
const { adminCheckToken } = require('../middlewares/admin');

router.post('/uploadfile', upload.array('file'), adminCheckToken, fileUploade);
module.exports = router;
