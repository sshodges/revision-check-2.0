const Document = require('../models/Document');
const Folder = require('../models/Folder');
const Revision = require('../models/Revision');
const DocumentFollower = require('../models/DocumentFollower');
const bcrypt = require('bcrypt');
const md5 = require('md5');

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

exports.getByRevCode = async (req, res) => {
  try {
    const revision = await Revision.findOne({
      revcode: req.body.revCode,
    });

    if (!revision) {
      return res.status(400).json({ errorMessage: 'Revision cannot be found' });
    }

    const document = await Document.findOne({
      _id: revision.document,
    }).select(' -parent -account -__v -type');

    if (!document) {
      return res.status(400).json({ errorMessage: 'Document cannot be found' });
    }

    const notes = await Revision.find({
      document: revision.document,
    })
      .select('name note createdAt -_id')
      .sort({ createdAt: -1 });

    // If document is password protected and no password sent, return document protection status
    if (document.passwordProtected & !req.body.password) {
      return res.status(200).json({
        passwordProtected: true,
      });
    }

    // If document is password protected and password sent, compare passwords
    if (document.passwordProtected && req.body.password) {
      console.log(req.body.password);
      console.log(document);
      const isMatched = await bcrypt.compare(
        req.body.password,
        document.password
      );

      if (!isMatched) {
        return res.status(400).json({ errorMessage: 'Incorrect password' });
      }
    }

    const payload = {
      document,
      revision,
      notes,
    };

    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.followDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.body.documentId,
    });

    if (document) {
      const follower = new DocumentFollower({
        email: req.body.email,
        document: req.body.documentId,
        approved: document.requireApproval === false,
      });

      const savedFollower = await follower.save();
      return res.status(200).json(savedFollower);
    }

    return res.status(400).json({ errorMessage: 'Document not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.followerApprove = async (req, res) => {
  try {
    const follower = await DocumentFollower.findOne({
      _id: req.body.followerId,
    });

    if (!follower) {
      return res.status(400).json({ errorMessage: 'Follower not found' });
    }

    const document = await Document.findOne({
      _id: follower.document,
      account: req.user.account,
    });

    if (document) {
      const follower = await DocumentFollower.findOneAndUpdate(
        {
          _id: req.body.followerId,
        },
        {
          approved: true,
          blocked: false,
        }
      );
      console.log(follower);

      return res.status(200).json(follower);
    }

    return res.status(401).json({ errorMessage: 'Not authorised' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.followerDeny = async (req, res) => {
  try {
    const follower = await DocumentFollower.findOne({
      _id: req.body.followerId,
    });

    console.log(req.body);

    if (!follower) {
      return res.status(400).json({ errorMessage: 'Follower not found' });
    }

    const document = await Document.findOne({
      _id: follower.document,
      account: req.user.account,
    });

    if (document) {
      const follower = await DocumentFollower.findOneAndUpdate(
        {
          _id: req.body.followerId,
        },
        {
          approved: false,
          blocked: true,
        }
      );
      return res.status(200).json(follower);
    }

    return res.status(401).json({ errorMessage: 'Not authorised' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const followers = await DocumentFollower.find({
      document: req.params.id,
    });

    return res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.getArchive = async (req, res) => {
  try {
    const documents = await Document.find({
      account: req.user.account,
      status: false,
    });

    return res.status(200).json(documents);
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
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;
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

    let update = req.body;

    if (update.password) {
      // Generate salt for password
      const salt = await bcrypt.genSalt(10);

      // Hash password
      update.password = await bcrypt.hash(update.password, salt);
    }

    const document = await Document.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });

    // Emit to socket
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;

    req.io.sockets.in(room).emit('update document', document);

    res.status(200).json({ modifyCount: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
