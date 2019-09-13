const express = require('express');
const router = express.Router();
const {
  documentValidator
} = require('../middleware/validators/request-validation');
const archiveController = require('../controllers/archiveController');
const auth = require('../middleware/auth');

// @route   GET api/archives
// @desc    All Archived Documents
// @access  Private
app.get('/', [documentValidator.get, auth], archiveController.getAll);

// @route   PUT api/archives/:id
// @desc    Unarchive Document
// @access  Private
app.put('/:id', [documentValidator.get, auth], archiveController.activate);

module.exports = router;
