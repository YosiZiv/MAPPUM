const express = require('express');
const router = express.Router();
const {
  getUserActiveSales,
  createCustomer,
  getUserCustomers,
} = require('../handlers/user');
//  middleware
const { adminCheckToken } = require('../core/middleware/admin');
const asyncMiddleware = require('../core/middleware/async');
const { authMiddleware } = require('../core/middleware/auth');

router.get('/', asyncMiddleware(getUserActiveSales));
router.post('/customer', asyncMiddleware(createCustomer));
router.get('/customers', authMiddleware, asyncMiddleware(getUserCustomers));
module.exports = router;
