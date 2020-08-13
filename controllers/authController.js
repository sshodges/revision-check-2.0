const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtUtil } = require('../utils-module/index');

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID, // Your user pool id here
  ClientId: process.env.COGNITO_CLIENT_ID, // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.getUser = async (req, res) => {
  try {
    // Get user id created by Auth middleware (not completed yet) and find user in database
    let user = await User.findById(req.user.id)
      .populate('account')
      .select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: email,
        Password: password,
      }
    );

    var userData = {
      Username: email,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        return res.status(200).json({
          accessToken,
          idToken,
          refreshToken,
        });
      },
      onFailure: function (err) {
        return res.status(400).json({ errorMessage: 'Invalid Credentils' });
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server Error' });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, confirmCode } = req.body;
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmCode, true, function (err, result) {
    if (err) {
      res.status(400).json({ errorMessage: err.message });
      return;
    }
    res.status(200).json({ result });
  });
};

exports.resendVerifyUser = async (req, res) => {
  const { email } = req.body;
  const userData = {
    Username: email,
    Pool: userPool,
  };

  console.log(email);

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.resendConfirmationCode(function (err, result) {
    if (err) {
      res.status(400).json({ errorMessage: err.message });
      return;
    }
    res.status(200).json({ result });
    console.log('call result: ' + result);
  });
};
