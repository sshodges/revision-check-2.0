const express = require('express');
const router = express.Router();
const {
  authValidator
} = require('../middleware/validators/request-validation');
const {
  loginRateLimiter,
  apiRateLimiter
} = require('../middleware/rate-limiters');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', [/*apiRateLimiter,*/ auth], authController.getUser);

// @route   POST api/auth
// @desc    Login user and create token
// @access  Public
router.post('/', [loginRateLimiter, authValidator.login], authController.login);

// @route   POST api/auth/reset_password
// @desc    Reset users password and email token
// @access  Public

// @route   GET api/auth/verify_account
// @desc    Veryfy account
// @access  Public

module.exports = router;
