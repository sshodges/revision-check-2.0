const express = require('express');
const router = express.Router();
const {
  folderValidator
} = require('../middleware/validators/request-validation');
const folderController = require('../controllers/folderController');
const auth = require('../middleware/auth');

// @route   GET api/folders/parent/:parent
// @desc    All Folders with :parent
// @access  Private
router.get(
  '/parent/:parent',
  [folderValidator.get, auth],
  folderController.getByParent
);

// @route   GET api/folders/:id
// @desc    All Folders with :id
// @access  Private
router.get('/:id', [folderValidator.get, auth], folderController.get);

// @route   GET api/folders/search/:searchTerm
// @desc    Search Folder Names for {searchTerm}
// @access  Private
router.get(
  '/search/:searchTerm',
  [folderValidator.search, auth],
  folderController.search
);

// @route   GET api/folders/children/:id
// @desc    Get All Children Folders
// @access  Private
router.get(
  '/children/:id',
  [folderValidator.get, auth],
  folderController.getChildren
);

// @route   POST api/folders/
// @desc    Add New Folder
// @access  Private
router.post('/', [folderValidator.add, auth], folderController.add);

// @route   PUT api/folders/
// @desc    Edit Folder
// @access  Private
router.post('/', [folderValidator.update, auth], folderController.update);

// @route   DELETE api/folders/:id
// @desc    Delete Folder
// @access  Private
router.delete('/:id', [folderValidator.get, auth], folderController.delete);

module.exports = router;
