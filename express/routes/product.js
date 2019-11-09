const express = require('express');

const router = express.Router();
const { createProduct } = require('../handlers/product');
const { authMiddleware } = require('../core/middleware/auth');

//  middleware
const asyncMiddleware = require('../core/middleware/async');
const { adminCheckToken } = require('../core/middleware/admin');

router.post('/', authMiddleware, asyncMiddleware(createProduct));

// router.post('/')
module.exports = router;
