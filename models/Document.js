const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folders',
    default: null,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'document',
  },
  passwordProtected: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: '',
  },
  allowFollowers: {
    type: Boolean,
    default: false,
  },
  requireApproval: {
    type: Boolean,
    default: false,
  },
  allowDocumentDownload: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('document', DocumentSchema);
