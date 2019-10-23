const mongoose = require('mongoose');

const RevisionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'documents',
    required: true
  },
  latest: {
    type: Boolean,
    default: true
  },
  revcode: {
    type: String,
    unique: true
  },
  scans: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('revision', RevisionSchema);
