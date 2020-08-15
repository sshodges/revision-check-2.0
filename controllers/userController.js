const User = require('../models/User');
const Account = require('../models/Account');
const md5 = require('md5');

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID, // Your user pool id here
  ClientId: process.env.COGNITO_CLIENT_ID, // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.register = async (req, res) => {
  const { email, companyName } = req.body;

  try {
    // Check if user email exists in MongoDB
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ errorMessage: 'User already exists' });
      return;
    }

    // Create Account
    let account = new Account({
      companyName,
    });
    await account.save();

    // Create User object
    user = new User({
      email,
      account: account._id,
    });

    // Save uers
    await user.save();

    // Send created User
    res.status(200).json({ email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    // Update User
    const filter = {
      _id: req.user.id,
    };
    const update = { firstName, lastName, email, phone };

    const user = await User.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    }).populate('account');
    // Emit to socket
    const room = md5(req.user.account._id.toString()) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('update user', user);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
