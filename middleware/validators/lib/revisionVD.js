const { check, validationResult } = require('express-validator');

exports.get = [
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

exports.search = [
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

exports.add = [
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

exports.update = [
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
