const { check, validationResult } = require('express-validator');

exports.register = [
  // Email Validation
  check('email', 'Please enter a valid email')
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail(),

  // Check if validation passes, otherwise block endpoint
  function (req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(400).json({
        errorMessage: errorValidation,
      });
    }
    next();
  },
];

exports.update = [
  // First Name Validation
  check('firstName', 'First name is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('First name must be a string')
    .trim()
    .escape()
    .isLength({ max: 30 })
    .withMessage('First name can only be a maximum of 30 characters')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  // Last Name Validation
  check('lastName', 'Last name is required').not().isEmpty(),
  // Email Validation
  check('email', 'Please enter a valid email')
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail(),

  // Check if validation passes, otherwise block endpoint
  function (req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(400).json({
        errorMessage: errorValidation,
      });
    }
    next();
  },
];
