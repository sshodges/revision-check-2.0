const { check, validationResult } = require('express-validator');

exports.login = [
  // Email Validation
  check('email', 'Please enter a valid email')
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail(),
  // Password Validation
  check('password').exists(),
  // Check if validation passes, otherwise block endpoint
  function(req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(400).json({
        errorMessage: errorValidation
      });
    }
    next();
  }
];
