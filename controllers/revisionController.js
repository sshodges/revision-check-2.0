const Revision = require('../models/Revision');
const customId = require('custom-id');
const md5 = require('md5');
const AWS = require('aws-sdk');
const fs = require('fs');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (buffer, name) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: 'application/pdf',
    Key: `${name}.pdf`,
  };
  return s3.upload(params).promise();
};

exports.getByDocument = async (req, res) => {
  try {
    const revisions = await Revision.find({
      account: req.user.account,
      document: req.params.documentId,
    })
      .sort({ createdAt: -1 })
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
      account: req.user.account,
      _id: req.params.id,
    }).select('-__v');

    res.status(200).json(revision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.upload = async (req, res) => {
  try {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const name = fields.name[0];
        const revisionId = fields.revisionId[0];
        const buffer = fs.readFileSync(path);
        const fileName = `revision-documents/${name}`;
        const data = await uploadFile(buffer, fileName);

        // Update revision
        const filter = {
          account: req.user.account,
          _id: revisionId,
        };
        const update = {
          documentLocation: data.Location,
        };

        const revision = await Revision.findOneAndUpdate(filter, update, {
          returnOriginal: false,
        });

        // Emit to socket
        const room = md5(req.user.account);
        req.io.sockets.in(room).emit('update revision', revision);

        return res.status(200).json(revision);
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, document, note } = req.body;
    const revision = new Revision({
      name,
      document,
      note,
      account: req.user.account,
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

    // Emit to socket
    const room = md5(req.user.account);
    req.io.sockets.in(room).emit('add revision', savedRevision);

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
      account: req.user.account,
      _id: req.params.id,
    };
    const update = req.body;

    const revision = await Revision.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.account);
    req.io.sockets.in(room).emit('update revision', revision);

    res.status(200).json({ updatedRevision: revision });
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
