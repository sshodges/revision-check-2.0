const User = require('../models/User');

require('dotenv').config();

const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const pool_region = process.env.COGNITO_REGION;

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID, // Your user pool id here
  ClientId: process.env.COGNITO_CLIENT_ID, // Your client id here
};

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');

  // Return error if request not sent with token
  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: 'No authenitcation token, access denied' });
  }

  try {
    request(
      {
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          pems = {};
          var keys = body['keys'];
          for (var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          //validate the token
          var decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            console.log('Not a valid JWT token');
            return;
          }

          var kid = decodedJwt.header.kid;
          var pem = pems[kid];
          if (!pem) {
            console.log('Invalid token');
            return;
          }

          jwt.verify(token, pem, async function (err, payload) {
            if (err) {
              console.log('Invalid Token.');
            } else {
              let user = await User.findOne({ email: payload.email }).populate(
                'account'
              );
              if (user) {
                req.user = user;
                next();
                return;
              }

              console.log('user not found');
            }
          });
        } else {
          console.log('Error! Unable to download JWKs');
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: error });
  }
};
