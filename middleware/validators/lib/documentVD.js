const { check, validationResult } = require('express-validator');

exports.get = [
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

exports.search = [
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

exports.add = [
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

exports.byRevCode = [
  // DocumentID Validation
  check('revCode', 'Missing a revCode').not().isEmpty(),
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

exports.follow = [
  // Email Validation
  check('email', 'Please enter a valid email')
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail(),
  // DocumentID Validation
  check('documentId', 'Missing a documentId').not().isEmpty(),
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

exports.delete = [
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
