const User = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");

exports.signup = (req, res) => {
  const { username, password } = req.body;
  if (!username || (username.length < 8 && !password) || password.length < 10) {
    res.status(400).json({ error: "Username & Password is invalid" });
  } else {
    const user = new User({ password, username });
    user.save((err, user) => {
      if (err) {
        return res.status(401).json({ error: errorHandler(err) });
      }

      return res.json({ message: "Signup success. Please sign in" });
    });
  }
  // if (!password || password.length < 10) {
  //   res.status(400).json({ error: "Password is invalid" });
  // }
};

exports.signin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not exist" });
    }
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ error: "Username & password do not match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, role } = user;
    return res.json({ token, user: { _id, username, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success"
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }

    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.role !== 1) {
      return res.status(400).json({ error: "Admin resource. Access denied" });
    }

    next();
  });
};
