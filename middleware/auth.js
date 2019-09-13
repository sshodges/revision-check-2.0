const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');

  // Return error if request not sent with token
  if (!token) {
    res
      .status(401)
      .json({ errorMessage: 'No authenitcation token, access denied' });
  }

  try {
    // Decode token and get user id
    const decodedJWT = jwt.verify(token, process.env.jwtSecret);
    // Decrypt token data
    var bytes = cryptojs.AES.decrypt(decodedJWT.token, process.env.cryptoKey);
    var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
    // Send user with id to endpoint
    req.user = tokenData.user;
    next();
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};
