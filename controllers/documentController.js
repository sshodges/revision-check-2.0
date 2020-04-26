const Document = require('../models/Document');
const Folder = require('../models/Folder');
const md5 = require('md5');

exports.getByParent = async (req, res) => {
  try {
    if (req.params.parent === 'home') {
      req.params.parent = null;
    }
    const documents = await Document.find({
      account: req.user.account,
      parent: req.params.parent,
    }).select('-__v');

    return res.status(200).json(documents);
  } catch (error) {
    console.error(req.params.parent);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const documents = await Document.find({
      account: req.user.account,
      _id: req.params.id,
    }).select('-__v');

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const documents = await Document.find({
      account: req.user.account,
      status: true,
    });

    const folders = await Folder.find({
      account: req.user.account,
    });

    return res.status(200).json([...documents, ...folders]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const document = new Document({
      name,
      parent,
      account: req.user.account,
    });
    const savedDocument = await document.save();
    await savedDocument.populate('user', '-password').execPopulate();

    // Emit to socket
    const room = md5(req.user.account) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('add document', savedDocument);

    return res.status(201).json({
      message: 'New Document successfully added',
      savedDocument,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const filter = {
      account: req.user.account,
      _id: req.params.id,
    };
    const update = req.body;

    const document = await Document.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.account) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('update document', document);

    res.status(200).json({ modifyCount: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const filter = {
      account: req.user.account,
      _id: req.params.id,
    };
    const update = { status: false };

    const document = await Document.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.account) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('delete document', document);

    res.status(200).json({ modifyCount: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.body.search;
    const documents = await Document.find({
      name: { $regex: `^${searchTerm}`, $options: 'i' },
      account: req.user.account,
    })
      .populate('user', '_id firstName lastName')
      .select('-__v');

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
