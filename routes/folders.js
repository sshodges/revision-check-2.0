const express = require('express');
const router = express.Router();
const {
  folderValidator,
} = require('../middleware/validators/request-validation');
const folderController = require('../controllers/folderController');
const auth = require('../middleware/auth');

// @route   POST api/folders/
// @desc    Add New Folder
// @access  Private
router.post('/', [folderValidator.add, auth], folderController.add);

// @route   PUT api/folders/
// @desc    Edit Folder
// @access  Private
router.put('/:id', [folderValidator.update, auth], folderController.update);

// @route   DELETE api/folders/:id
// @desc    Delete Folder
// @access  Private
router.delete('/:id', [folderValidator.get, auth], folderController.delete);

module.exports = router;
