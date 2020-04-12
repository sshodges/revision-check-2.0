const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folders',
    default: null,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  type: {
    type: String,
    default: 'folder',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FolderSchema.post('findOneAndDelete', { document: true }, async function (
  doc,
  next
) {
  let parentIds = [this.getQuery()['_id']];
  let hasChildren = true;
  let folders = [];
  let documents = [];

  while (hasChildren) {
    let childFolders = await mongoose.model('folder').distinct('_id', {
      parent: { $in: parentIds },
    });

    let childDocuments = await mongoose.model('document').distinct('_id', {
      parent: { $in: parentIds },
    });

    if (childFolders.length === 0) {
      hasChildren = false;
    }

    folders = folders.concat(childFolders);
    documents = documents.concat(childDocuments);

    parentIds = childFolders;
  }

  await mongoose.model('folder').deleteMany({ _id: { $in: folders } });

  await mongoose
    .model('document')
    .updateMany(
      { _id: { $in: documents } },
      { $set: { status: false, parent: null } }
    );

  next();
});

module.exports = mongoose.model('folder', FolderSchema);
