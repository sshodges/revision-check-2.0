const bcrypt = require('bcrypt');
const { jwtUtil } = require('../utils-module/index');
const User = require('../models/User');
const Account = require('../models/Account');
const md5 = require('md5');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  try {
    // Check if user email exists
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ errorMessage: 'User already exists' });
    } else {
      // Create Account
      let account = new Account({
        companyName,
      });
      await account.save();

      // Create User object
      user = new User({
        firstName,
        lastName,
        email,
        password,
        account: account._id,
      });

      // Generate salt for password
      const salt = await bcrypt.genSalt(10);

      // Hash password
      user.password = await bcrypt.hash(password, salt);

      // Save uers
      await user.save();

      // Send back token with user id
      await jwtUtil.createToken(user).then((token) => {
        res.json({ token });
      });
    }
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
    const room = md5(req.user.account._id) + process.env.SOCKET_HASH;
    req.io.sockets.in(room).emit('update user', user);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
