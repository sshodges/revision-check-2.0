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
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    require: true,
  },
  deletedDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'documents',
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

// On Folder delete, loop through each child folder/document and delete/archive
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

  // Delete child Folders
  await mongoose.model('folder').deleteMany({ _id: { $in: folders } });

  // Archive child Documents
  await mongoose
    .model('document')
    .updateMany(
      { _id: { $in: documents } },
      { $set: { status: false, parent: null } }
    );

  // Save list of documents to deletedDocuments property
  doc.deletedDocuments = documents;
  next();
});

module.exports = mongoose.model('folder', FolderSchema);
