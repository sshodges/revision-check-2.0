const Document = require('../models/Document');

exports.getByParent = async (req, res) => {
  try {
    if (req.params.parent === 'home') {
      req.params.parent = null;
    }
    const documents = await Document.find({
      user: req.user.id,
      parent: req.params.parent
    }).select('-__v');

    res.status(200).json(documents);
  } catch (error) {
    console.error(req.params.parent);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user.id,
      _id: req.params.id
    }).select('-__v');

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const document = new Document({
      name,
      parent,
      user: req.user.id
    });
    const savedDocument = await document.save();
    await savedDocument.populate('user', '-password').execPopulate();
    res.status(201).json({
      message: 'New Document successfully added',
      savedDocument
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
      _id: req.params.id
    };
    const update = req.body;

    const document = await Document.updateOne(filter, update);

    res.status(200).json({ modifyCount: document.nModified });
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
      user: req.user.id
    })
      .populate('user', '_id firstName lastName')
      .select('-__v');

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
