const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProductsByUserId,
  getProductById,
  deleteProduct,
} = require('../handlers/product');
const { authMiddleware } = require('../core/middleware/auth');

//  middleware
const asyncMiddleware = require('../core/middleware/async');
const { adminCheckToken } = require('../core/middleware/admin');

router.post('/', authMiddleware, asyncMiddleware(createProduct));
router.get('/', authMiddleware, asyncMiddleware(getProductsByUserId));
router.get('/:productId', authMiddleware, asyncMiddleware(getProductById));
router.delete('/:productId', authMiddleware, asyncMiddleware(deleteProduct));

//deleteProduct
// router.post('/')
module.exports = router;
