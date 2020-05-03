const express = require('express');
const router = express.Router();
const {
  documentValidator,
} = require('../middleware/validators/request-validation');
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

// @route   GET api/documents/getall/items
// @desc    Get all active documents and folders
// @access  Private
router.get(
  '/getall/items',
  [documentValidator.get, auth],
  documentController.getAll
);

// @route   GET api/documents/archive
// @desc    Get all archived documents
// @access  Private
router.get('/archive/all', [auth], documentController.getArchive);

// @route   POST api/documents
// @desc    Add New Document
// @access  Private
router.post('/', [documentValidator.add, auth], documentController.add);

// @route   PUT api/documents/:id
// @desc    Update Document
// @access  Private
router.put('/:id', [documentValidator.update, auth], documentController.update);

module.exports = router;
