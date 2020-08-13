const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
