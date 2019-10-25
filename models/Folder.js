const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folders',
    default: null
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  type: {
    type: String,
    default: 'folder'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('folder', FolderSchema);
