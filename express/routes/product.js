const express = require('express');

const router = express.Router();
const { createProduct } = require('../handlers/product');

//  middleware
const asyncMiddleware = require('../middleware/async');
const { adminCheckToken } = require('../core/middleware/admin');

router.post('/', adminCheckToken, asyncMiddleware(createProduct));

// router.post('/')
module.exports = router;
