const express = require('express');
const router = express.Router();
const {
  userValidator,
} = require('../middleware/validators/request-validation');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', userValidator.register, userController.register);

// @route   PUT api/users
// @desc    Update user
// @access  Public
router.put('/', [userValidator.update, auth], userController.updateUser);

module.exports = router;
