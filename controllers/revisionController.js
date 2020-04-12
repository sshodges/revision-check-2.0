const Revision = require('../models/Revision');
const customId = require('custom-id');

exports.getByDocument = async (req, res) => {
  try {
    const revisions = await Revision.find({
      user: req.user.id,
      document: req.params.documentId,
    })
      .sort({ latest: -1 })
      .select('-__v');

    res.status(200).json(revisions);
  } catch (error) {
    console.error(req.params.parent);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const revision = await Revision.find({
      user: req.user.id,
      _id: req.params.id,
    }).select('-__v');

    res.status(200).json(revision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, document } = req.body;
    const revision = new Revision({
      name,
      document,
      user: req.user.id,
      revcode: customId({}),
    });
    const savedRevision = await revision.save();

    // Update other revisions to latest=false
    const filter = {
      document,
      _id: { $ne: savedRevision._id },
    };
    const update = { latest: false };
    await Revision.updateMany(filter, update);

    res.status(201).json({
      message: 'New Revision successfully added',
      savedRevision,
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

    const revision = await Revision.updateOne(filter, update);

    res.status(200).json({ modifyCount: revision.nModified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.revcode = async (req, res) => {
  try {
    const revision = await Revision.find({
      revcode: req.params.revcode,
    }).select('-__v');

    res.status(200).json(revision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
