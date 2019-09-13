const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folders',
    default: 0,
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('document', DocumentSchema);
