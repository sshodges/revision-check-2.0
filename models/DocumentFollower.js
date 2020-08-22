const mongoose = require('mongoose');

const DocumentFollowerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'document',
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('documentFollower', DocumentFollowerSchema);
