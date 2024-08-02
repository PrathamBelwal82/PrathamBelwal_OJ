const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/Users'); // Adjust the path to your User model

const storeuserIdInCookie = (userId,res) => {
  res.cookie('userId', userId, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days expiry
    secure: process.env.NODE_ENV === 'production' ? true : false, // Set secure to true in production
  });
};

module.exports = { storeuserIdInCookie };