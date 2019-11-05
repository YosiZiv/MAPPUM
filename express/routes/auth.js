const express = require('express');
const passport = require('passport');

//  middleware
const asyncMiddleware = require('../middleware/async');

// initalizing express router
const router = express.Router();

const { login } = require('../handlers/auth');

//  @route POST api/auth/login
//  @desc Login User / Returning JWT Token
//  @access Public
router.post('/login', asyncMiddleware(login));

module.exports = router;
