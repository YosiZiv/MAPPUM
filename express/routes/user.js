const express = require('express');

const router = express.Router();
const { createUser, createCustomer } = require('../handlers/user');
//  middleware
const { adminCheckToken } = require('../core/middleware/admin');
const asyncMiddleware = require('../core/middleware/async');

router.post('/', asyncMiddleware(createUser));
router.post('/customer', adminCheckToken, asyncMiddleware(createCustomer));

module.exports = router;
