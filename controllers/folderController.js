const Folder = require('../models/Folder');
const md5 = require('md5');

exports.getByParent = async (req, res) => {
  try {
    if (req.params.parent === 'home') {
      req.params.parent = null;
    }
    const folders = await Folder.find({
      user: req.user.id,
      parent: req.params.parent,
    }).select('-__v');

    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const folder = await Folder.find({
      user: req.user.id,
      _id: req.params.id,
    }).select('-__v');

    res.status(200).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.getChildren = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const folder = new Folder({
      name,
      parent,
      user: req.user.id,
    });
    const savedFolder = await folder.save();
    await savedFolder.populate('user', '-password').execPopulate();

    // Emit to socket
    const room = md5(req.user.id);
    req.io.sockets.in(room).emit('add folder', savedFolder);

    res.status(201).json({
      message: 'New Folder Successfully Added',
      savedFolder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const filter = {
      user: req.user.id,
      _id: req.params.id,
    };
    const update = req.body;

    const folder = await Folder.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.id);
    req.io.sockets.in(room).emit('update folder', folder);

    res.status(200).json({ updatedFolder: folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.body.search;
    const folders = await Folder.find({
      name: { $regex: `^${searchTerm}`, $options: 'i' },
      user: req.user.id,
    })
      .populate('user', '_id firstName lastName')
      .select('-__v');

    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete(
      {
        user: req.user.id,
        _id: req.params.id,
      },
      {
        returnOriginal: false,
      }
    );

    // Emit to socket
    const room = md5(req.user.id);
    req.io.sockets.in(room).emit('delete folder', folder);

    res.status(200).json({ deletedFolder: folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
