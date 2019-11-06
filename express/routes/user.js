const express = require('express');
const router = express.Router();
const {
  createUser,
  createCustomer,
  getUserCustomers,
} = require('../handlers/user');
//  middleware
const { adminCheckToken } = require('../core/middleware/admin');
const asyncMiddleware = require('../core/middleware/async');
const { authMiddleware } = require('../core/middleware/auth');

router.post('/', asyncMiddleware(createUser));
router.post('/customer', asyncMiddleware(createCustomer));
router.get('/customers', authMiddleware, asyncMiddleware(getUserCustomers));
module.exports = router;
