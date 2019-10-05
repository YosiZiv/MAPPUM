const express = require('express');
const passport = require('passport');

// initalizing express router
const router = express.Router();

const { login } = require('../handlers/auth');

//  @route POST api/auth/register
//  @desc Register a User
//  @access Public

//  @route POST api/auth/login
//  @desc Login User / Returning JWT Token
//  @access Public
router.post('/login', login);

//  @route GET api/auth/current
//  @desc Return current user
//  @access Private
// router.get('/current', passport.authenticate('jwt', { session: false }), current);

router.get('/', (req, res) => {
    res.json({ msg: 'hello' })
})
module.exports = router;
