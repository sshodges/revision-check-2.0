const bcrypt = require('bcrypt');
const { jwtUtil } = require('../utils-module/index');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user email exists
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ errorMessage: 'User already exists' });
    } else {
      // Create User object
      user = new User({
        firstName,
        lastName,
        email,
        password
      });

      // Generate salt for password
      const salt = await bcrypt.genSalt(10);

      // Hash password
      user.password = await bcrypt.hash(password, salt);

      // Save uers
      await user.save();

      // Send back token with user id
      await jwtUtil.createToken(user).then(token => {
        res.json({ token });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};
