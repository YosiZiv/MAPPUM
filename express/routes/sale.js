const express = require('express');
const router = express.Router();
const { createNewSale, getUserActiveSales } = require('../handlers/sale');
//  middleware
const { adminCheckToken } = require('../core/middleware/admin');
const asyncMiddleware = require('../core/middleware/async');
const { authMiddleware } = require('../core/middleware/auth');

router.post('/', asyncMiddleware(createNewSale));
router.get('/:userId', authMiddleware, asyncMiddleware(getUserActiveSales));
module.exports = router;
