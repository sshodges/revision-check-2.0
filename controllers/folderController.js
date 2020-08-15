const Folder = require('../models/Folder');
const md5 = require('md5');

exports.add = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const folder = new Folder({
      name,
      parent,
      account: req.user.account,
    });
    const savedFolder = await folder.save();
    await savedFolder.populate('user', '-password').execPopulate();

    // Emit to socket
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;

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
      account: req.user.account,
      _id: req.params.id,
    };
    const update = req.body;

    const folder = await Folder.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('update folder', folder);

    res.status(200).json({ updatedFolder: folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete(
      {
        account: req.user.account,
        _id: req.params.id,
      },
      {
        returnOriginal: false,
      }
    );

    // Emit to socket
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('delete folder', folder);

    res.status(200).json({ deletedFolder: folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
