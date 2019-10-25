const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
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
  status: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'document'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('document', DocumentSchema);
