const express = require('express');

//  middleware
const asyncMiddleware = require('../core/middleware/async');

// initalizing express router
const router = express.Router();

const { login, emailConfirm } = require('../handlers/auth');

//  @route POST api/auth/login
//  @desc Login User / Returning JWT Token
//  @access Public
router.post('/', asyncMiddleware(login));
router.get('/confirm/:token', asyncMiddleware(emailConfirm));
module.exports = router;
