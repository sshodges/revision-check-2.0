const express = require('express');
const router = express.Router();
const {
  userValidator
} = require('../middleware/validators/request-validation');
const userController = require('../controllers/userController');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', userValidator.register, userController.register);

// @route   POST api/users
// @desc    Add sub-user
// @access  Private

module.exports = router;
