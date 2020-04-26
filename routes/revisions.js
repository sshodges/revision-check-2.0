const express = require('express');
const router = express.Router();
const {
  revisionValidator,
} = require('../middleware/validators/request-validation');
const revisionController = require('../controllers/revisionController');
const auth = require('../middleware/auth');

// @route   GET api/document/:documentId
// @desc    Revisions by :documentId
// @access  Private
router.get(
  '/document/:documentId',
  [revisionValidator.get, auth],
  revisionController.getByDocument
);

// @route   GET api/:id
// @desc    Revisions by :id
// @access  Private
router.get('/:id', [revisionValidator.get, auth], revisionController.get);

// @route   PUT api/:id
// @desc    Update Revision
// @access  Private
router.put('/:id', [revisionValidator.update, auth], revisionController.update);

// @route   POST api/:documentId
// @desc    Add New Revision
// @access  Private
router.post('/', [revisionValidator.add, auth], revisionController.add);

// @route   POST api/upload
// @desc    Upload New Revision Document
// @access  Private
router.post('/upload', [auth], revisionController.upload);

// @route   GET api/:revcode
// @desc    Search Revisions by {revcode}
// @access  Public
router.get(
  '/revcode/:revcode',
  revisionValidator.search,
  revisionController.revcode
);

module.exports = router;
