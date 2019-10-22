const Folder = require('../models/Folder');

exports.getByParent = async (req, res) => {
  try {
    const folders = await Folder.find({
      user: req.user.id,
      parent: req.params.parent
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
      _id: req.params.id
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
      user: req.user.id
    });
    const savedFolder = await folder.save();
    await savedFolder.populate('user', '-password').execPopulate();
    res.status(201).json({
      message: 'New Folder Successfully Added',
      savedFolder
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const filter = {
      user: req.user.id,
      _id: req.params.id
    };
    const update = {
      name,
      parent
    };

    const folder = await Folder.updateOne(filter, update);

    res.status(200).json({ modifyCount: folder.nModified });
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
      user: req.user.id
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
    const folder = await Folder.deleteOne({
      user: req.user.id,
      _id: req.params.id
    });

    res.status(200).json({ deletedCount: folder.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
