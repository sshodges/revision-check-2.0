const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

exports.createToken = function (user) {
  return new Promise((resolve, reject) => {
    // Send back token with user account
    const payload = {
      user: {
        account: user.account,
        id: user._id,
      },
    };

    // Encrypt token data
    const stringData = JSON.stringify(payload);
    const encryptedData = cryptojs.AES.encrypt(
      stringData,
      process.env.cryptoKey
    ).toString();

    // Create JWT Token
    jwt.sign(
      { token: encryptedData },
      process.env.jwtSecret,
      { expiresIn: process.env.jwtExpireTime },
      (err, token) => {
        if (err) {
          reject(error);
        } else {
          resolve({ token });
        }
      }
    );
  });
};
