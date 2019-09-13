const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');

const mongoConn = mongoose.connection;

// Login Rate Limiter

// Create login rate limiter
// @desc: 10 tries in 5 minutes, blocks IP for 10 minutes
const Login = new RateLimiterMongo({
  storeClient: mongoConn,
  points: 10,
  duration: 300,
  blockDuration: 600,
  keyPrefix: 'rlLogin'
});

// Create login rate limiter middleware
exports.loginRateLimiter = (req, res, next) => {
  Login.consume(req.connection.remoteAddress)
    .then(() => next())
    .catch(() =>
      res.status(429).json({
        message: 'Too many login attempts'
      })
    );
};

// API Rate Limiter

// @desc: 100 tries in 30 seconds, blocks IP for 5 minutes
const API = new RateLimiterMongo({
  storeClient: mongoConn,
  points: 100,
  duration: 30,
  blockDuration: 300,
  keyPrefix: 'rlApi'
});

// Create login rate limiter middleware
exports.apiRateLimiter = (req, res, next) => {
  API.consume(req.connection.remoteAddress)
    .then(() => next())
    .catch(() =>
      res.status(429).json({
        message: 'Too many API requests'
      })
    );
};
