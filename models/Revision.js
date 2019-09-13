const mongoose = require('mongoose');

const RevisionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'documents',
    required: true
  },
  latest: {
    type: Boolean,
    default: false,
    required: true
  },
  revcode: {
    type: String,
    unique: true,
    required: true
  },
  scans: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('revision', RevisionSchema);
