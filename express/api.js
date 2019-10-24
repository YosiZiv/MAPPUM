const express = require('express');

const router = express.Router();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const emailRoutes = require('./routes/email');
const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mail', emailRoutes);
router.use('/user', userRoutes);
router.use('/file', fileRoutes);
module.exports = router;
