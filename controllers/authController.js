const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtUtil } = require('../utils-module/index');

exports.getUser = async (req, res) => {
  try {
    // Get user id created by Auth middleware (not completed yet) and find user in database
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const isMatched = await bcrypt.compare(password, user.password);

    if (!user || !isMatched) {
      res.status(400).json({ errorMessage: 'Invalid Credentils' });
    } else {
      await jwtUtil.createToken(user).then(token => {
        res.json({ token });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
