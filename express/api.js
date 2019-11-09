const express = require('express');

const router = express.Router();

const authRoutes = require('./routes/auth');
const saleRoutes = require('./routes/sale');
const emailRoutes = require('./routes/email');
const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/product');

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);
router.use('/sale', saleRoutes);
router.use('/product', productRoutes);
router.use('/email', emailRoutes);
router.use('/user', userRoutes);
// router.use('/file', fileRoutes);
module.exports = router;
