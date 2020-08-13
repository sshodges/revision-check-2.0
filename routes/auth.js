const express = require('express');
const router = express.Router();
const {
  authValidator,
} = require('../middleware/validators/request-validation');
const {
  loginRateLimiter,
  apiRateLimiter,
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

// @route   POST api/auth/confirm-user
// @desc    Confirm user email
// @access  Public
router.post('/verify-user', [loginRateLimiter], authController.verifyUser);

// @route   POST api/auth/confirm-user
// @desc    Confirm user email
// @access  Public
router.post(
  '/resend-verify-user',
  [loginRateLimiter],
  authController.resendVerifyUser
);

module.exports = router;
