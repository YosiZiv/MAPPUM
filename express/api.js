const express = require('express');

const router = express.Router();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const emailRoutes = require('./routes/email');
const userRoutes = require('./routes/user');
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mail', emailRoutes)
router.use('/user', userRoutes)
module.exports = router;
