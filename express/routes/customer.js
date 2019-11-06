const express = require('express');

const router = express.Router();
const { createCustomer } = require('../handlers/customer');
//  middleware
const { adminCheckToken } = require('../core/middleware/admin');
const asyncMiddleware = require('../core/middleware/async');

router.post('/', asyncMiddleware(createCustomer));

module.exports = router;
