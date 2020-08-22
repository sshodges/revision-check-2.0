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

// @route   GET api/documents/get-followers
// @desc    Get all followers for a document
// @access  Private
router.get('/get-followers/:id', [auth], documentController.getFollowers);

// @route   POST api/documents/by-rev-code
// @desc    Get document, revision and notes by Revcode
// @access  Public
router.post(
  '/by-rev-code',
  [documentValidator.byRevCode],
  documentController.getByRevCode
);

// @route   POST api/documents/follow-document
// @desc    Add email to document notifications
// @access  Public
router.post(
  '/follow-document',
  [documentValidator.follow],
  documentController.followDocument
);

// @route   POST api/documents/follower/approve
// @desc    Approve a follower of a document to receive notifications
// @access  Private
router.post('/follower/approve', [auth], documentController.followerApprove);

// @route   POST api/documents/follower/deny
// @desc    Deny a follower of a document to receive notifications
// @access  Private
router.post('/follower/deny', [auth], documentController.followerDeny);

// @route   POST api/documents
// @desc    Add New Document
// @access  Private
router.post('/', [documentValidator.add, auth], documentController.add);

// @route   PUT api/documents/:id
// @desc    Update Document
// @access  Private
router.put('/:id', [documentValidator.update, auth], documentController.update);

module.exports = router;
