const express = require('express');

const router = express.Router();
const { getSell } = require('../handlers/user');
const { userCheckToken } = require('../middlewares/user');

router.post('/getsellforuser', userCheckToken, getSell);
// router.post('/')
module.exports = router;
