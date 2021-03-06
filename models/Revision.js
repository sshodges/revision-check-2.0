const mongoose = require('mongoose');

const RevisionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'documents',
    required: true,
  },
  latest: {
    type: Boolean,
    default: true,
  },
  revcode: {
    type: String,
    unique: true,
  },
  scans: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'revision',
  },
  note: {
    type: String,
    default: '',
  },
  documentLocation: {
    type: String,
    default: '',
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('revision', RevisionSchema);
