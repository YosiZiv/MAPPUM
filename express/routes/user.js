const express = require('express');

const router = express.Router();
const { getSell } = require('../handlers/user');

//  middleware
const asyncMiddleware = require('../middleware/async');
const { userCheckToken } = require('../middleware/user');

router.post('/getsellforuser', userCheckToken, asyncMiddleware(getSell));
// router.post('/')
module.exports = router;
