const express = require('express');

const router = express.Router();
const { getSell } = require('../handlers/user');

//  middleware
const asyncMiddleware = require('../middlewares/async');
const { userCheckToken } = require('../middlewares/user');

router.post('/getsellforuser', userCheckToken, asyncMiddleware(getSell));
// router.post('/')
module.exports = router;
