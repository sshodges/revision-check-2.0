const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  companyName: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('account', AccountSchema);
