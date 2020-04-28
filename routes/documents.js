const express = require('express');
const router = express.Router();
const {
  documentValidator,
} = require('../middleware/validators/request-validation');
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

// @route   GET api/documents/parent/:parent
// @desc    All Documents with :parent
// @access  Private
router.get(
  '/parent/:parent',
  [documentValidator.get, auth],
  documentController.getByParent
);

// @route   GET api/documents/:id
// @desc    Document with :id
// @access  Private
router.get('/:id', [documentValidator.get, auth], documentController.get);

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

// @route   GET api/documents/search/:searchTerm
// @desc    Search Document Names for :searchTerm
// @access  Private
router.post(
  '/search',
  [documentValidator.search, auth],
  documentController.search
);

// @route   POST api/documents
// @desc    Add New Document
// @access  Private
router.post('/', [documentValidator.add, auth], documentController.add);

// @route   PUT api/documents/:id
// @desc    Update Document
// @access  Private
router.put('/:id', [documentValidator.update, auth], documentController.update);

// // @route   DELETE api/documents/:id
// // @desc    Delete Document
// // @access  Private
// router.put('/:id', [documentValidator.delete, auth], documentController.delete);

module.exports = router;
